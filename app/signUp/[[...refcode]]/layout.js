export async function generateMetadata() {
    return {
        title: "Kayıt Ol",
        description: "Yeni hesabınızı oluşturun ve platforma giriş yapın.",
        keywords: ["kayıt ol", "üye ol", "hesap oluştur"],
    };
}

export default function SignInLayout({ children }) {
    return children;
}
