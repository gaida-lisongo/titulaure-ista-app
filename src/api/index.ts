import TitulaireService from "./titulaireService";
const apiUrl = "http://localhost:8080/api";

const titulaireService = new TitulaireService(apiUrl);
export default {
    Titulaire: titulaireService,
}