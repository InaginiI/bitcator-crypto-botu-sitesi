export async function generateMetadata() {
  return {
    title: "Giriş Yap",
    description: "Hesabınıza giriş yapın ve platformu kullanmaya devam edin.",
    keywords: ["giriş yap", "login", "oturum aç"],
  };
}

export default function SignInLayout({ children }) {
  return children;
}
