import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProgrammableService } from 'src/programmable/programmable.service';
import { CourDto } from './dtos/cour.dto';
import { Activite, NiveauPriorite } from 'src/programmable/entities/activite.entity';
import { CategorieProgrammable } from 'src/programmable/categorie.enum';


@Injectable()
export class OmnivoxService {


    private readonly omnivoxApiUrl = process.env.OMNIVOX_SERVICE_URL || 'http://127.0.0.1:8000';

    constructor(private httpService: HttpService, private programmableService : ProgrammableService) {}

    async getCours(da : number, password : string): Promise<CourDto[]>{
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.omnivoxApiUrl}/classes`, {
                    da: String(da),
                    password: password,
                })
            );
            return response.data;
        } catch (error : any) {
            const status = error.response?.status;
            const detail = error.response?.data?.detail;
 
            if (status === 401) {
                throw new UnauthorizedException('Invalid Omnivox credentials');
            }
 
            throw new HttpException(
                `Omnivox service error: ${JSON.stringify(detail)}`,
                status
            );
        }
    }

    async importCours(da: number, password: string, userId: number, calendrierId?: number | null){

        const cours = await this.getCours(da, password);

        const results: Activite[] = [];
        const errors: { cours: string; dateDepart: Date; error: string }[] = [];

        for(const cour of cours){
            try {
                const activite = await this.programmableService.createActivite(
                    {
                        nom : cour.nom,
                        description: cour.description,
                        dateDepart: new Date(cour.dateDepart),
                        dureeHeures: cour.dureeHeures,
                        priorite: NiveauPriorite.IMPORTANCE_MOYENNE,
                        categorie: CategorieProgrammable.COURS,
                        forceCreate: true,
                    },
                    userId,
                    calendrierId ?? null,
                );
                results.push(activite);
            }
            catch(err: any){
                errors.push({ cours: cour.nom, dateDepart: cour.dateDepart, error: err.message });
            }
        }

        return {
            activites: results,
            erreurs: errors,
        };

    }

}
