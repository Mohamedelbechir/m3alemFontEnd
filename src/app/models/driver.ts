import { Passager } from './Passager';

export interface Driver extends Passager {
    etatCompte: string;
    etatInscription: string;
}