"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth";

export async function login(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const email = formData?.get ? formData.get("email")?.toString().trim() : "";
  const password = formData?.get ? formData.get("password")?.toString() : "";

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let authError = null;
  try {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    authError = error;
  } catch (err) {
    return { error: err.message || "Gagal menghubungkan ke layanan autentikasi." };
  }

  if (authError) {
    let pesan = authError.message;
    if (pesan === "Invalid login credentials") {
      pesan = "Email atau password salah.";
    }
    return { error: pesan };
  }

  redirect("/admin");
}

export async function keluar() {
  try {
    const supabase = await createAuthClient();
    await supabase.auth.signOut();
  } catch {
    // Abaikan jika sesi sudah berakhir
  }

  redirect("/admin/login");
}

export const logout = keluar;

export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const passwordBaru = formData?.get ? (formData.get("password_baru") || formData.get("passwordBaru"))?.toString() : "";
  const konfirmasi = formData?.get ? (formData.get("konfirmasi_password") || formData.get("konfirmasiPassword") || formData.get("konfirmasi"))?.toString() : "";

  if (!passwordBaru || !konfirmasi) {
    return { error: "Semua kolom wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasi) {
    return { error: "Konfirmasi password tidak sama." };
  }

  let updateError = null;
  try {
    const supabase = await createAuthClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Sesi tidak valid atau belum login." };
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });
    updateError = error;
  } catch (err) {
    return { error: err.message || "Gagal mengganti password." };
  }

  if (updateError) {
    return { error: updateError.message || "Gagal mengganti password." };
  }

  return { sukses: true, pesan: "Password berhasil diganti." };
}

export const updatePassword = gantiPassword;
