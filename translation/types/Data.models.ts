export type APIdataResponse = {
  data: {
    translations: APItranslation[]
  };
}

export type APItranslation = {
  translatedText: string;
  detectedSourceLanguage: string;
};
