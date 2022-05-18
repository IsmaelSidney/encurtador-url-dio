import { URLModel } from "../database/model/URL";
import { Request, response, Response } from "express";
import shortid from "shortid";
import { config } from "../config/Constants";

export class UrlController {
    public async shorten(req: Request, res: Response): Promise<void> {
        const { originURL } = req.body

        const url = await URLModel.findOne({ originURL })

        if (url) {
            res.json(url)
            return
        }
        const hash = shortid.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        res.json(newURL)

    }


    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar hash da URL 
        const { hash } = req.params;

        const url = await URLModel.findOne({ hash });
        //Encontrar a url original pelo hash

        if (url) {
            res.redirect(url.originURL);
            return
        }
        // Redirecionar para a url original a partir do que encontramos no BD

        res.status(400).json({ error: "URL not found" })
    }
}