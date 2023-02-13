import { Request, Response } from 'express';
import { v2 } from '@google-cloud/translate';

class TranslationController {
  private readonly translate: v2.Translate = new v2.Translate();

  public getTranslationasync = async (req: Request, res: Response) => {
    try {
      const text = ['próba', 'lubię to'];
      const target = 'en';
      let [translations] = await this.translate.translate(text, target);
      translations = Array.isArray(translations)
        ? translations
        : [translations];
      translations.forEach((translation: string, i: number) => {
        console.log(`${text[i]} => ${translation}`);
      });

      return res.send(`Welcome to test route!!`);
    } catch (err: any) {
      console.log('err ----> ', err);
    }
  };
}

export default new TranslationController();
