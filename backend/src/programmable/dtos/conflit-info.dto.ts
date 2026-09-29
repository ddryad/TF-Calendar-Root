// Représente un conflit entre deux activités dans le calendrier d'un utilisateur
export class ConflitInfo {
    activiteIdA: number;
    nomA: string;
    debutA: Date;
    finA: Date;

    activiteIdB: number;
    nomB: string;
    debutB: Date;
    finB: Date;

    chevauchementMinutes: number;
}
