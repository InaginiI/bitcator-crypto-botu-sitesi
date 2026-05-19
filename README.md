# Bitcator — Kripto Trading Bot Platformu

Bu proje, staj sürecimde çalıştığım şirketin var olan kripto trading bot platformunun **yeniden tasarlanmış versiyonudur**. Mevcut sitenin kullanıcı arayüzü ve deneyimi baştan ele alınarak modern bir tasarım dili, karanlık/aydınlık tema desteği ve çok dilli yapı ile yeniden inşa edilmiştir.

---

## Proje Kapsamı

Staj boyunca üstlendiğim bu yeniden tasarım projesinde aşağıdaki başlıklar ele alındı:

- Mevcut sitenin görsel kimliğini koruyarak UI'ı modern standartlara taşımak
- Kullanıcı akışlarını (kayıt, giriş, şifre sıfırlama) sıfırdan yeniden yapılandırmak
- Karanlık / aydınlık tema desteği eklemek
- Türkçe, İngilizce ve Almanca çok dil desteği
- Fiyatlandırma, blog, iletişim ve hakkımızda sayfalarını oluşturmak
- Mobil uyumlu (responsive) tasarım

---

## Özellikler

### Genel
- **7/24 AI destekli trading botları** — otomatik alım/satım işlemleri
- **Canlı fiyat takibi** — gerçek zamanlı BTC/USDT görünümü
- **Karanlık / Aydınlık tema** — kullanıcı tercihine göre
- 

### Sayfalar
| Sayfa | Açıklama |
|-------|----------|
| Ana Sayfa | Hero, nasıl çalışır, özellikler, istatistikler, SSS, partnerler |
| Fiyatlandırma | Free / Starter / Advanced / Premium planlar, aylık & yıllık |
| Giriş / Kayıt | Kimlik doğrulama, referans kodu desteği |
| Şifre Sıfırlama | E-posta ile sıfırlama akışı |
| Dashboard | Kullanıcı paneli |
| Blog | İçerik sayfası |
| İletişim | İletişim formu |
| Hakkımızda | Şirket tanıtımı |

### Desteklenen Borsalar
Binance · Bybit · KuCoin · OKX · Gate.io · Bitget · Huobi · MEXC

---

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Kütüphanesi | [Chakra UI v3](https://chakra-ui.com/) |
| Animasyon | [Framer Motion](https://www.framer-motion.com/) |
| Kimlik Doğrulama | [better-auth](https://www.better-auth.com/) |
| Veritabanı | MongoDB |
| Çok Dil | [next-intl](https://next-intl-docs.vercel.app/) |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) |
| Form | Formik + Yup |
| CAPTCHA | Cloudflare Turnstile |
| İkonlar | Lucide React · React Icons |

---

## Kurulum

### Gereksinimler
- Node.js 18+
- MongoDB (yerel veya bulut)

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/InaginiI/bitcator---crypto-botu-sitesi.git
cd bitcator---crypto-botu-sitesi

# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini ayarla
cp .env.example .env
# .env dosyasını kendi değerlerinle düzenle

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

### Ortam Değişkenleri

`.env.example` dosyasındaki değişkenleri kendi ortamına göre doldur:

```env
DATABASE_URL=        # MongoDB bağlantı URL'i
BETTER_AUTH_SECRET=  # Rastgele güçlü bir string
BETTER_AUTH_URL=     # Uygulamanın çalıştığı URL
NEXT_PUBLIC_BETTER_AUTH_URL=  # Client tarafı auth URL'i
```

---

## Proje Yapısı

```
bitcator/
├── app/
│   ├── components/
│   │   ├── layout/      # Header, Hero, Footer vb. ana bölümler
│   │   ├── common/      # ThemeToggle gibi ortak bileşenler
│   │   └── ui/          # Chakra UI provider, toaster vb.
│   ├── lib/             # Auth ve MongoDB yapılandırması
│   ├── signIn/          # Giriş sayfası
│   ├── signUp/          # Kayıt sayfası
│   ├── dashboard/       # Kullanıcı paneli
│   ├── pricing/         # Fiyatlandırma sayfası
│   ├── blog/            # Blog sayfası
│   ├── contact/         # İletişim sayfası
│   └── about/           # Hakkımızda sayfası
├── messages/
│   ├── tr.json          # Türkçe çeviriler
│   ├── en.json          # İngilizce çeviriler
│   └── de.json          # Almanca çeviriler
└── public/
    └── images/          # Logo, partner ve özellik görselleri
```


## Geliştirici

**Öyküm İlayda Demir**  
Staj projesi — 2025
