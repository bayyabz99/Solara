/* SOLARA – içerik ve görsel yuvaları
   Görselleri hazır olunca images/ altına aşağıdaki adlarla koyun; sayfa otomatik kullanır.
   Dosya yoksa çizilmiş yer tutucu görünür. Tam liste: images/README.md */
window.SOLARA = {
  brand: {
    name: 'SOLARA',
    tagline: 'Güneşin tadı, soğuk sıkım.',
    logo: ['images/logo.svg', 'images/logo.png']           // yoksa metin wordmark
  },
  hero: {
    bottle: ['images/hero/hero-bottle.webp', 'images/hero/hero-bottle.png'],
    bg: ['images/hero/hero-bg.webp', 'images/hero/hero-bg.jpg']
  },
  products: [
    {
      id: 'mango', name: 'MANGO', title: 'Mango', sub: 'Soğuk sıkım mango suyu',
      bg: '#FFB627', ink: '#3a2200', accent: '#FF6B1A', shape: 'slice',
      text: 'Olgun mangonun yumuşak, tropikal tadı. Ekstra şeker yok, sadece meyve ve güneş.',
      notes: ['Tropikal', 'Yumuşak', 'Tatlı'],
      facts: { kcal: '118', ml: '330', fruit: '%100' },
      bottle: ['images/products/mango.webp', 'images/products/mango.png'],
      floaties: ['images/ingredients/mango-1.png', 'images/ingredients/mango-2.png', 'images/ingredients/mango-3.png']
    },
    {
      id: 'nar', name: 'NAR', title: 'Nar', sub: 'Soğuk sıkım nar suyu',
      bg: '#B3122B', ink: '#fff3ee', accent: '#FF8A94', shape: 'drop',
      text: 'Ekşi ve tatlı arasında kusursuz denge. Taze sıkılmış narın yoğun, ferahlatıcı karakteri.',
      notes: ['Yoğun', 'Ekşimsi', 'Antioksidan'],
      facts: { kcal: '96', ml: '330', fruit: '%100' },
      bottle: ['images/products/nar.webp', 'images/products/nar.png'],
      floaties: ['images/ingredients/nar-1.png', 'images/ingredients/nar-2.png', 'images/ingredients/nar-3.png']
    },
    {
      id: 'limon-nane', name: 'LİMON NANE', title: 'Limon & Nane', sub: 'Soğuk sıkım limonata',
      bg: '#C9EA6B', ink: '#1d3610', accent: '#3E8E2F', shape: 'leaf',
      text: 'Bol limon, taze nane. Yaz sıcağında içinizi açan, buz gibi bir ferahlık.',
      notes: ['Ferah', 'Narenciye', 'Naneli'],
      facts: { kcal: '64', ml: '330', fruit: '%92' },
      bottle: ['images/products/limon-nane.webp', 'images/products/limon-nane.png'],
      floaties: ['images/ingredients/limon-1.png', 'images/ingredients/limon-2.png', 'images/ingredients/limon-3.png']
    },
    {
      id: 'yaban-mersini', name: 'YABAN MERSİNİ', title: 'Yaban Mersini', sub: 'Soğuk sıkım orman meyveleri',
      bg: '#3B2F86', ink: '#f1eeff', accent: '#9C8BFF', shape: 'berry',
      text: 'Derin, koyu ve hafif ekşi. Orman meyvelerinin zengin aroması tek şişede.',
      notes: ['Derin', 'Meyvemsi', 'Hafif ekşi'],
      facts: { kcal: '87', ml: '330', fruit: '%100' },
      bottle: ['images/products/yaban-mersini.webp', 'images/products/yaban-mersini.png'],
      floaties: ['images/ingredients/mersin-1.png', 'images/ingredients/mersin-2.png', 'images/ingredients/mersin-3.png']
    },
    {
      id: 'seftali', name: 'ŞEFTALİ', title: 'Şeftali', sub: 'Soğuk sıkım şeftali suyu',
      bg: '#FFB8A3', ink: '#5a1e12', accent: '#FF5C3D', shape: 'slice',
      text: 'Yaz bahçesinden yumuşacık bir tat. Ağızda dağılan, kadifemsi bir şeftali deneyimi.',
      notes: ['Kadifemsi', 'Bahçe', 'Hafif'],
      facts: { kcal: '102', ml: '330', fruit: '%100' },
      bottle: ['images/products/seftali.webp', 'images/products/seftali.png'],
      floaties: ['images/ingredients/seftali-1.png', 'images/ingredients/seftali-2.png', 'images/ingredients/seftali-3.png']
    }
  ],
  stores: [
    ['images/stores/store-1.svg', 'Market 1'],
    ['images/stores/store-2.svg', 'Market 2'],
    ['images/stores/store-3.svg', 'Market 3'],
    ['images/stores/store-4.svg', 'Market 4']
  ]
};
