# Neon Territories - APK Build Guide

## 🎮 Oyun Hakkında

**Neon Territories** tamamen özgün, telif riski olmayan bir bilgi-strateji oyunudur.

### Özellikler:
- ✅ Soyut hexagonal harita (gerçek dünya haritası YOK)
- ✅ 90+ özgün Türkçe soru
- ✅ 3 seviye AI rakip (Acemi, Dengeli, Zeki)
- ✅ Yerel çok oyunculu mod
- ✅ Seri bonus sistemi
- ✅ Modern neon estetik tasarım
- ✅ Mobil uyumlu (responsive)

---

## 📱 APK Oluşturma Yöntemleri

### Yöntem 1: PWABuilder (En Kolay)

1. **Oyunu bir web sunucusuna yükle** (GitHub Pages, Netlify, Vercel vb.)
2. **https://pwabuilder.com** adresine git
3. Oyunun URL'sini gir
4. "Package for stores" → "Android" seç
5. APK dosyasını indir

### Yöntem 2: Apache Cordova

```bash
# Node.js kurulu olmalı
npm install -g cordova

# Proje oluştur
cordova create neon-territories com.yourname.neonterritories NeonTerritories
cd neon-territories

# www klasörüne oyun dosyalarını kopyala
# (index.html, styles.css, game.js, questions.js)

# Android platformu ekle
cordova platform add android

# APK oluştur
cordova build android
```

APK dosyası: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Yöntem 3: Capacitor (Önerilen)

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android

npx cap init "Neon Territories" "com.yourname.neonterritories"
npx cap add android

# Oyun dosyalarını www/ klasörüne kopyala
npx cap copy android
npx cap open android
# Android Studio'da Build → Build APK
```

### Yöntem 4: WebView Wrapper (Manuel Android Studio)

1. Android Studio'da yeni proje oluştur
2. `WebView` içeren basit bir Activity oluştur
3. Assets klasörüne oyun dosyalarını kopyala
4. WebView'da `file:///android_asset/index.html` yükle
5. APK oluştur

---

## 🌐 Hızlı Test (Web)

Oyunu hemen test etmek için:

1. Dosyaları bir web sunucusuna yükle veya
2. Yerel sunucu başlat:
   ```bash
   # Python ile
   python -m http.server 8000
   
   # Node.js ile
   npx serve .
   ```
3. Tarayıcıda `http://localhost:8000` aç

---

## 📁 Dosya Yapısı

```
neon-territories/
├── index.html      # Ana HTML dosyası
├── styles.css      # Tüm stiller (neon tema)
├── game.js         # Oyun motoru
├── questions.js    # Soru veritabanı (90+ soru)
├── manifest.json   # PWA manifest
└── icons/          # Uygulama ikonları (oluşturulacak)
    ├── icon-192.png
    └── icon-512.png
```

---

## ⚖️ Telif Güvenliği Kontrol Listesi

- [x] Oyun adı özgün: "Neon Territories"
- [x] Harita tamamen soyut (gerçek ülke yok)
- [x] Tüm sorular özgün yazılmış
- [x] Kod %100 orijinal
- [x] Herhangi bir oyuna (Triviador, Risk vb.) referans yok
- [x] Grafikler CSS ile üretilmiş (görsel varlık yok)
- [x] Terimler özgün (fethet → ele geçir vb.)

---

## 🚀 Sonraki Adımlar

1. **İkon Oluştur**: 192x192 ve 512x512 PNG ikonlar
2. **Test Et**: Farklı cihazlarda test et
3. **APK Oluştur**: Yukarıdaki yöntemlerden birini kullan
4. **Yayınla**: Google Play Store'a yükle

---

## 📞 İletişim

Bu proje Anti-Gravity AI ile oluşturulmuştur.
