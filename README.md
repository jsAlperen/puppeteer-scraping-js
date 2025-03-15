
# Web Sayfası ve Kaynak İndirme Aracı (Puppeteer)

Bu proje, bir web sayfasını ve ona bağlı tüm kaynakları (CSS, JavaScript, resimler, vb.) indirerek yerel bir dizine kaydetmek için **Puppeteer** ve **Axios** kullanır. Dahili bağlantıları takip ederek, tüm siteyi kopyalamanızı sağlar.

## Özellikler

- Web sayfasını ve bağlı tüm kaynakları indirir.
- Dahili bağlantıları takip eder ve her sayfanın kopyasını kaydeder.
- Kaynak dosyaları (CSS, JS, resimler) yerel dizine kaydedilir.
- Dosyalar, web sayfasındaki URL yapılarına uygun şekilde kaydedilir.

## Kurulum

### Gereksinimler

- **Node.js** (v18 ve üstü)
- **npm** veya **yarn**

### Adımlar

1. **Projenin Klonlanması**:

   ```bash
   git clone https://github.com/<kullanıcı-adı>/web-page-downloader.git
   cd web-page-downloader
   ```

2. **Gerekli Modüllerin Yüklenmesi**:

   Projeyi çalıştırmadan önce gerekli bağımlılıkları yüklemeniz gerekmektedir.

   ```bash
   npm install
   ```

   veya

   ```bash
   yarn install
   ```

3. **Script'in Çalıştırılması**:

   Web sayfasını ve kaynakları indirmek için şu komutu çalıştırın:

   ```bash
   node index.js
   ```

   Bu komut, **`urlToDownload`** değişkenindeki web sayfasını indirir ve tüm kaynakları yerel diskinize kaydeder.

## Kullanım

- **`urlToDownload`** değişkenini, indirmek istediğiniz web sayfasının URL'si ile değiştirin.
  
- **`saveDir`** değişkeni, indirilen dosyaların kaydedileceği dizini belirler. Varsayılan olarak `site_kopya` olarak ayarlanmıştır.

- Web sayfasındaki tüm kaynaklar (CSS, JavaScript, resimler) yerel dizine kaydedilir ve her sayfa ayrı ayrı .html dosyası olarak kaydedilir.

## Nasıl Çalışır?

1. **Sayfa İndirme**: Script, verdiğiniz URL'ye giderek web sayfasını indirir.
2. **Kaynak Dosyaları İndirme**: Sayfadaki tüm stil dosyaları (CSS), görseller (resimler) ve JavaScript dosyaları indirilir.
3. **Dahili Bağlantılar**: Script, sayfadaki tüm dahili bağlantıları takip eder ve bu sayfaların kopyalarını da indirir.
4. **Dizin Yapısı**: Kaynak dosyaları, URL yapısına uygun şekilde kaydedilir.

## Yapı

- `index.js`: Ana script dosyası. Puppeteer ile web sayfası indirme işlemini başlatır.
- `package.json`: Projenin bağımlılıklarını ve komutlarını içerir.

## Bağımlılıklar

- `puppeteer`: Web sayfasını indirmek için kullanılan başlıca kütüphanedir.
- `axios`: Kaynak dosyalarını indirmek için kullanılan HTTP istemcisidir.
- `fs`: Dosya sistemine yazma işlemleri için kullanılır.
- `path`: Dosya yollarını düzenlemek için kullanılır.

## Katkı

1. Repo'yu fork'layın.
2. Değişikliklerinizi yapın.
3. Değişikliklerinizi bir pull request ile gönderin.

## Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
