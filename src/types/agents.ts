export interface Agent {
    id: number
    matricule: string
    nom: string
    post_nom: string
    prenom: string
    sexe: string
    date_naiss: string | null
    e_mail: string | null
    telephone: string | null
    avatar: string | null
    mdp: string | null
    adresse: string | null
    statut: string | null
    grade: string | null
    secure: string | null
}
