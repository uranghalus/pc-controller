export interface Setting {
    id: number | null; // ID pengaturan, bisa null jika belum ada
    ip_controller: string; // IP Controller
    name: string | null; // Nama controller, bisa null jika belum diisi
    status: string | null; // Status controller, bisa null jika belum diisi
}
