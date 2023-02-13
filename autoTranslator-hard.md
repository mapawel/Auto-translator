<h2 align="center">Auto translator</h2>

<br>

## Cele główne

- [ ] Stwórz aplikację umożliwiającą tłumaczenie fraz wysłanych do serwera
- [ ] Do tłumaczenie wykorzystaj API Translatora Googla
- [ ] Aplikacja powinna wspierać cachowanie przetłumaczonych danych za pomocą systemu plików
- [ ] Moduły aplikacji powinny być ze sobą luźno sprzężone

## Przydatne linki

- Czym jest i jak działa moduł _file system_ - https://www.sohamkamani.com/blog/nodejs-file-system-guide/
- Przykładowa apka dla zarysu - https://www.youtube.com/watch?v=Sjl9ilOpHG8

### Kod dla lepszego początku

```javascript
const pl = {
    attention: {
      title: 'Dobrze, że jesteś, sprawdź to zadanie',
      subtitle: 'Pomoże Ci ogarnąć jak zmieniać język w apkach reacta',
      ctaButton: 'Dowiedź się więcej',
    },
    newsletter: {
      title: 'Bądź na bieżąco',
      ctaButton: 'Idź do repo ->',
      action: '/new-subscriber?lang=pl',
    },
};

// do endpointa leci sobie takie requestBody
const requestBody = {
  lang: 'en',
};

class Translator {
  async translate() {}
}
```
