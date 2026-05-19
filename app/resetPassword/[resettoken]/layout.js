export async function generateMetadata() {
    return {
        title: "Şifre Sıfırlama",
        description: "Şifrenizi sıfırlamak için gerekli adımları takip edin.",
        keywords: ["şifre sıfırlama", "şifre yenileme", "hesap güvenliği"],
    };
}

export default function ResetPasswordLayout({ children }) {
    return children;
}
