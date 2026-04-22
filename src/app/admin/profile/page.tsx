export default function AdminProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Admin giriş bilgileri ve güvenlik ayarları bu ekranda genişletilebilir.
        </p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700">Admin Bilgisi</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Şifre güncelleme formunu sonraki adımda buraya Gürgen Packaging
          profil akışına benzer şekilde ekleyebiliriz.
        </p>
      </section>
    </div>
  );
}
