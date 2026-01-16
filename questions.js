/**
 * NEON TERRITORIES - Question Database
 * 100% Original Questions (No Copyright Issues)
 * Categories: General, Science, Sports, Entertainment, Geography, History
 */

const QUESTIONS = {
    general: [
        {
            question: "Bir yılda kaç hafta vardır?",
            options: ["48", "50", "52", "54"],
            correct: 2
        },
        {
            question: "Gökkuşağında kaç renk bulunur?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "İnsan vücudunda kaç kemik bulunur?",
            options: ["186", "206", "226", "256"],
            correct: 1
        },
        {
            question: "Bir futbol takımında kaç oyuncu sahada bulunur?",
            options: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "Bir dakikada kaç saniye vardır?",
            options: ["30", "60", "90", "100"],
            correct: 1
        },
        {
            question: "Dünya'nın en büyük okyanusu hangisidir?",
            options: ["Atlantik", "Hint", "Pasifik", "Arktik"],
            correct: 2
        },
        {
            question: "Bir üçgenin iç açılarının toplamı kaç derecedir?",
            options: ["90", "180", "270", "360"],
            correct: 1
        },
        {
            question: "Hangi gezegen Güneş'e en yakındır?",
            options: ["Venüs", "Mars", "Merkür", "Dünya"],
            correct: 2
        },
        {
            question: "DNA'nın açılımı nedir?",
            options: ["Deoksiribonükleik Asit", "Dinamik Nükleer Atom", "Dijital Nöron Ağı", "Doğal Nitrojen Asidi"],
            correct: 0
        },
        {
            question: "Işık hızı yaklaşık kaç km/s'dir?",
            options: ["100.000", "200.000", "300.000", "400.000"],
            correct: 2
        },
        {
            question: "Bir kare kaç kenarlıdır?",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Hangi element sembolü 'O' ile gösterilir?",
            options: ["Altın", "Oksijen", "Osmiyum", "Oganeson"],
            correct: 1
        },
        {
            question: "Bir asırda kaç yıl vardır?",
            options: ["10", "50", "100", "1000"],
            correct: 2
        },
        {
            question: "Güneş hangi yönden doğar?",
            options: ["Batı", "Kuzey", "Güney", "Doğu"],
            correct: 3
        },
        {
            question: "İnsan beyninin yaklaşık ağırlığı nedir?",
            options: ["500 gram", "1 kg", "1.4 kg", "2 kg"],
            correct: 2
        }
    ],
    science: [
        {
            question: "Suyun kimyasal formülü nedir?",
            options: ["CO2", "H2O", "NaCl", "O2"],
            correct: 1
        },
        {
            question: "Hangi gezegen 'Kızıl Gezegen' olarak bilinir?",
            options: ["Jüpiter", "Mars", "Satürn", "Venüs"],
            correct: 1
        },
        {
            question: "Elektrik akımının birimi nedir?",
            options: ["Volt", "Watt", "Amper", "Ohm"],
            correct: 2
        },
        {
            question: "Periyodik tabloda kaç element vardır (2024)?",
            options: ["108", "112", "118", "126"],
            correct: 2
        },
        {
            question: "Hangi vitamin güneş ışığından sentezlenir?",
            options: ["A Vitamini", "B12 Vitamini", "C Vitamini", "D Vitamini"],
            correct: 3
        },
        {
            question: "Yerçekimi ivmesi yaklaşık kaç m/s²'dir?",
            options: ["5.8", "9.8", "12.8", "15.8"],
            correct: 1
        },
        {
            question: "İnsan vücudundaki en büyük organ hangisidir?",
            options: ["Karaciğer", "Beyin", "Deri", "Akciğer"],
            correct: 2
        },
        {
            question: "Suyun kaynama noktası kaç derecedir?",
            options: ["50°C", "80°C", "100°C", "120°C"],
            correct: 2
        },
        {
            question: "Hangi gaz atmosferin büyük çoğunluğunu oluşturur?",
            options: ["Oksijen", "Karbondioksit", "Azot", "Hidrojen"],
            correct: 2
        },
        {
            question: "Ay'a ilk ayak basan insan kimdir?",
            options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
            correct: 2
        },
        {
            question: "Ses hangi ortamda en hızlı yayılır?",
            options: ["Hava", "Su", "Katı", "Boşluk"],
            correct: 2
        },
        {
            question: "Hangi element en hafif elemandır?",
            options: ["Helyum", "Hidrojen", "Lityum", "Karbon"],
            correct: 1
        },
        {
            question: "Einstein'ın ünlü denklemi hangisidir?",
            options: ["F = ma", "E = mc²", "PV = nRT", "a² + b² = c²"],
            correct: 1
        },
        {
            question: "Bir atomun merkezinde ne bulunur?",
            options: ["Elektron", "Proton", "Çekirdek", "Nötron"],
            correct: 2
        },
        {
            question: "Fotosentez sırasında hangi gaz açığa çıkar?",
            options: ["Karbondioksit", "Azot", "Oksijen", "Metan"],
            correct: 2
        }
    ],
    sports: [
        {
            question: "FIFA Dünya Kupası kaç yılda bir düzenlenir?",
            options: ["2 yıl", "3 yıl", "4 yıl", "5 yıl"],
            correct: 2
        },
        {
            question: "Bir basketbol maçında bir takım kaç oyuncuyla oynar?",
            options: ["5", "6", "7", "11"],
            correct: 0
        },
        {
            question: "Olimpiyat Oyunları'nın sembolünde kaç halka vardır?",
            options: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            question: "Teniste 'love' ne anlama gelir?",
            options: ["1 sayı", "Beraberlik", "0 sayı", "Maç sonu"],
            correct: 2
        },
        {
            question: "Bir maraton kaç kilometredir?",
            options: ["21 km", "42 km", "50 km", "100 km"],
            correct: 1
        },
        {
            question: "Hangi spor dalında 'slam dunk' terimi kullanılır?",
            options: ["Futbol", "Voleybol", "Basketbol", "Tenis"],
            correct: 2
        },
        {
            question: "Formula 1 yarışlarında hangi bayrak yarışın bittiğini belirtir?",
            options: ["Kırmızı", "Sarı", "Yeşil", "Damalı"],
            correct: 3
        },
        {
            question: "Bir voleybol setini kazanmak için kaç sayıya ulaşmak gerekir?",
            options: ["15", "21", "25", "30"],
            correct: 2
        },
        {
            question: "Golf sporunda 'birdie' ne demektir?",
            options: ["Par üstü 1", "Par altı 1", "Delik bir vuruşta", "Çukura düşmedi"],
            correct: 1
        },
        {
            question: "Hangi ülke en çok Dünya Kupası kazanmıştır?",
            options: ["Almanya", "Arjantin", "Brezilya", "İtalya"],
            correct: 2
        },
        {
            question: "Bir boks raundunda kaç dakika vardır?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "Wimbledon tenis turnuvası hangi ülkede düzenlenir?",
            options: ["ABD", "Fransa", "Avustralya", "İngiltere"],
            correct: 3
        },
        {
            question: "Yüzmede 'serbest stil' hangi yüzme tekniğidir?",
            options: ["Kurbağalama", "Kelebek", "Sırtüstü", "Kulaç"],
            correct: 3
        },
        {
            question: "Bir hokey takımında kaç oyuncu sahada bulunur?",
            options: ["5", "6", "7", "11"],
            correct: 1
        },
        {
            question: "Hangi olimpiyat sporu buzda yapılmaz?",
            options: ["Buz hokeyi", "Artistik patinaj", "Curling", "Kayak"],
            correct: 3
        }
    ],
    entertainment: [
        {
            question: "Pac-Man oyununda karakterin yediği şeyler nedir?",
            options: ["Yıldızlar", "Noktalar", "Elmalar", "Çilekler"],
            correct: 1
        },
        {
            question: "Bir satranç tahtasında kaç kare vardır?",
            options: ["32", "48", "64", "81"],
            correct: 2
        },
        {
            question: "Monopoly oyununda 'Start' noktasından geçince kaç para alınır?",
            options: ["100", "150", "200", "250"],
            correct: 2
        },
        {
            question: "Tetris oyununda kaç farklı şekil vardır?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Bir rubik küpünün kaç yüzü vardır?",
            options: ["4", "5", "6", "8"],
            correct: 2
        },
        {
            question: "Hangi nota müzikte orta do olarak bilinir?",
            options: ["A4", "B4", "C4", "D4"],
            correct: 2
        },
        {
            question: "Bir standart oyun destesinde kaç kart vardır?",
            options: ["48", "52", "54", "56"],
            correct: 1
        },
        {
            question: "Sudoku oyununda kullanılan rakamlar hangileridir?",
            options: ["0-8", "1-9", "0-9", "1-10"],
            correct: 1
        },
        {
            question: "Bir piyano klavyesinde kaç tuş vardır (standart)?",
            options: ["76", "88", "96", "104"],
            correct: 1
        },
        {
            question: "Tavla oyununda her oyuncunun kaç pulu vardır?",
            options: ["12", "15", "18", "20"],
            correct: 1
        },
        {
            question: "Minecraft oyununda varsayılan karakter adı nedir?",
            options: ["Alex", "Steve", "John", "Max"],
            correct: 1
        },
        {
            question: "Bir gitar standart olarak kaç telli olur?",
            options: ["4", "5", "6", "8"],
            correct: 2
        },
        {
            question: "Scrabble oyununda 'Q' harfi kaç puan değerindedir?",
            options: ["8", "10", "12", "15"],
            correct: 1
        },
        {
            question: "Mario karakterinin kurtardığı prensesin adı nedir?",
            options: ["Daisy", "Rosalina", "Peach", "Zelda"],
            correct: 2
        },
        {
            question: "Bir domino taşında en fazla kaç nokta olabilir?",
            options: ["6", "9", "12", "15"],
            correct: 2
        }
    ],
    geography: [
        {
            question: "Dünyanın en uzun nehri hangisidir?",
            options: ["Amazon", "Nil", "Yangtze", "Mississippi"],
            correct: 1
        },
        {
            question: "Hangi ülke hem Avrupa hem de Asya kıtasında yer alır?",
            options: ["Rusya", "Kazakistan", "Türkiye", "Hepsi"],
            correct: 3
        },
        {
            question: "Everest Dağı hangi iki ülke sınırında yer alır?",
            options: ["Çin-Hindistan", "Nepal-Tibet", "Nepal-Çin", "Bhutan-Tibet"],
            correct: 2
        },
        {
            question: "Avustralya'nın başkenti neresidir?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
        },
        {
            question: "Dünyanın en küçük ülkesi hangisidir?",
            options: ["Monako", "San Marino", "Vatikan", "Malta"],
            correct: 2
        },
        {
            question: "Amazon Ormanları hangi kıtadadır?",
            options: ["Afrika", "Asya", "Güney Amerika", "Avustralya"],
            correct: 2
        },
        {
            question: "Japonya'nın başkenti neresidir?",
            options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"],
            correct: 2
        },
        {
            question: "Dünya'da kaç kıta vardır?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Büyük Set Resifi hangi ülkenin kıyısındadır?",
            options: ["Brezilya", "Avustralya", "Meksika", "Endonezya"],
            correct: 1
        },
        {
            question: "Sahra Çölü hangi kıtadadır?",
            options: ["Asya", "Avustralya", "Afrika", "Güney Amerika"],
            correct: 2
        },
        {
            question: "Hangi ülke 'Güneşin Doğduğu Ülke' olarak bilinir?",
            options: ["Çin", "Kore", "Japonya", "Vietnam"],
            correct: 2
        },
        {
            question: "Brezilya'nın resmi dili nedir?",
            options: ["İspanyolca", "Portekizce", "Fransızca", "İngilizce"],
            correct: 1
        },
        {
            question: "Mısır Piramitleri hangi çölde yer alır?",
            options: ["Gobi", "Sahra", "Kalahari", "Atacama"],
            correct: 1
        },
        {
            question: "Kanada'nın en büyük şehri hangisidir?",
            options: ["Vancouver", "Montreal", "Toronto", "Ottawa"],
            correct: 2
        },
        {
            question: "Akdeniz hangi kıtaları ayırır?",
            options: ["Avrupa-Asya", "Avrupa-Afrika", "Afrika-Asya", "Amerika-Afrika"],
            correct: 1
        }
    ],
    history: [
        {
            question: "İkinci Dünya Savaşı hangi yıllar arasında yaşandı?",
            options: ["1914-1918", "1939-1945", "1950-1953", "1960-1965"],
            correct: 1
        },
        {
            question: "İlk Olimpiyat Oyunları hangi ülkede düzenlendi?",
            options: ["Roma", "Mısır", "Yunanistan", "Türkiye"],
            correct: 2
        },
        {
            question: "Osmanlı İmparatorluğu'nu kim kurdu?",
            options: ["Fatih Sultan Mehmet", "Osman Bey", "Kanuni Sultan Süleyman", "Yıldırım Bayezid"],
            correct: 1
        },
        {
            question: "Ay'a ilk insan ne zaman ayak bastı?",
            options: ["1959", "1965", "1969", "1972"],
            correct: 2
        },
        {
            question: "Roma İmparatorluğu ne zaman yıkıldı?",
            options: ["MS 376", "MS 410", "MS 476", "MS 527"],
            correct: 2
        },
        {
            question: "Magna Carta hangi yılda imzalandı?",
            options: ["1066", "1215", "1453", "1789"],
            correct: 1
        },
        {
            question: "Fransız Devrimi hangi yılda başladı?",
            options: ["1776", "1789", "1804", "1815"],
            correct: 1
        },
        {
            question: "İstanbul hangi yılda fethedildi?",
            options: ["1453", "1461", "1517", "1520"],
            correct: 0
        },
        {
            question: "Birinci Dünya Savaşı'nı hangi olay başlattı?",
            options: ["Pearl Harbor Saldırısı", "Saraybosna Suikasti", "Lusitania'nın Batırılması", "Zimermann Telgrafı"],
            correct: 1
        },
        {
            question: "Amerikan Bağımsızlık Bildirgesi hangi yılda ilan edildi?",
            options: ["1770", "1776", "1783", "1787"],
            correct: 1
        },
        {
            question: "Atatürk hangi yılda doğdu?",
            options: ["1877", "1881", "1885", "1889"],
            correct: 1
        },
        {
            question: "Berlin Duvarı hangi yılda yıkıldı?",
            options: ["1985", "1987", "1989", "1991"],
            correct: 2
        },
        {
            question: "Antik Mısır'da kim piramitleri inşa ettirdi?",
            options: ["Köylüler", "Köleler", "Firavunlar", "Rahipler"],
            correct: 2
        },
        {
            question: "Türkiye Cumhuriyeti hangi yılda ilan edildi?",
            options: ["1920", "1923", "1924", "1927"],
            correct: 1
        },
        {
            question: "Kolomb Amerika'yı hangi yılda keşfetti?",
            options: ["1452", "1476", "1492", "1498"],
            correct: 2
        }
    ]
};

// Category metadata for display
const CATEGORY_INFO = {
    general: { name: "Genel Kültür", icon: "📚", color: "#8b5cf6" },
    science: { name: "Bilim & Teknoloji", icon: "🔬", color: "#00f5ff" },
    sports: { name: "Spor", icon: "⚽", color: "#00ff88" },
    entertainment: { name: "Eğlence & Oyun", icon: "🎮", color: "#ff00ff" },
    geography: { name: "Coğrafya", icon: "🌍", color: "#ffd700" },
    history: { name: "Tarih", icon: "📜", color: "#ff6b35" }
};

/**
 * Get a random question from selected categories
 * @param {string[]} categories - Array of category keys
 * @param {number[]} usedIndices - Already used question indices (to avoid repeats)
 * @returns {Object} Question object with category info
 */
function getRandomQuestion(categories, usedIndices = []) {
    // Filter available categories
    const availableCategories = categories.filter(cat => QUESTIONS[cat] && QUESTIONS[cat].length > 0);
    
    if (availableCategories.length === 0) {
        availableCategories.push('general'); // Fallback
    }
    
    // Pick random category
    const categoryKey = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const categoryQuestions = QUESTIONS[categoryKey];
    
    // Find unused question
    let attempts = 0;
    let questionIndex;
    
    do {
        questionIndex = Math.floor(Math.random() * categoryQuestions.length);
        attempts++;
    } while (usedIndices.includes(`${categoryKey}-${questionIndex}`) && attempts < 50);
    
    const question = categoryQuestions[questionIndex];
    
    return {
        ...question,
        category: categoryKey,
        categoryInfo: CATEGORY_INFO[categoryKey],
        uniqueId: `${categoryKey}-${questionIndex}`
    };
}

/**
 * Shuffle answer options (keeping track of correct answer)
 * @param {Object} question - Question object
 * @returns {Object} Question with shuffled options
 */
function shuffleOptions(question) {
    const options = [...question.options];
    const correctAnswer = options[question.correct];
    
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Find new correct index
    const newCorrectIndex = options.indexOf(correctAnswer);
    
    return {
        ...question,
        options: options,
        correct: newCorrectIndex
    };
}

// Export for use in game.js
window.QUESTIONS = QUESTIONS;
window.CATEGORY_INFO = CATEGORY_INFO;
window.getRandomQuestion = getRandomQuestion;
window.shuffleOptions = shuffleOptions;
