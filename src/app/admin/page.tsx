import {
  CheckCircle,
  Clock,
  FileText,
  Package,
} from "./stat-icons";
import type { ComponentType } from "react";

const cards = [
  { title: "Ürünler", value: "Ürün modülü", icon: Package, color: "bg-[#c5a059]/10 text-[#8a6e36]" },
  { title: "Hizmetler", value: "Hizmet modülü", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  { title: "Blog", value: "İçerikler", icon: FileText, color: "bg-blue-100 text-blue-700" },
  { title: "Randevular", value: "Talepler", icon: Clock, color: "bg-gray-100 text-gray-700" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Emsel Beauty site içerikleri ve operasyon modülleri.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-700">Modül Akışı</h2>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Kampanyalar, ürünler ve hizmetler ayrı ekip sahipliğinde yönetilir.</span>
                <span className="text-gray-400">Aktif</span>
              </li>
              <li className="flex justify-between">
                <span>Blog, hikaye ve site ayarları çok dilli içerik alanlarına bağlıdır.</span>
                <span className="text-gray-400">TR / EN / DE</span>
              </li>
              <li className="flex justify-between">
                <span>Randevu talepleri operasyon takibi için ayrı listelenir.</span>
                <span className="text-gray-400">Panel</span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-700">İçerik Durumu</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="py-2">Modül</th>
                    <th>Görev</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3">Ürünler</td>
                    <td>Liste / ekle / düzenle / sil</td>
                    <td className="text-green-600">Hazır</td>
                  </tr>
                  <tr>
                    <td className="py-3">Hizmetler</td>
                    <td>Galeri, SSS, süreç adımları</td>
                    <td className="text-green-600">Hazır</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Panel Mimarisi</p>
            <p className="mt-2 text-xl font-bold text-gray-800">
              Emsel Beauty yonetim akisi
            </p>
          </div>
          <div className="rounded-xl bg-[#f7e6d3] p-6">
            <h3 className="mb-2 font-semibold text-[#3b2a18]">Admin Notu</h3>
            <p className="text-sm leading-6 text-[#5f4a2a]">
              Her modül kendi route klasöründe çalışır. Ekip arkadaşları kendi
              modül dosyalarında rahatça ilerleyebilir.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
