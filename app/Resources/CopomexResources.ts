import axios from "axios";

export default class CopomexResources {
    public static async getCP(cp: string) {
        return await axios.get(`https://api.copomex.com/query/info_cp/${cp}?token=pruebas`);
    }
}