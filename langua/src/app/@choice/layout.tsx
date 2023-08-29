import { Container } from "@mui/material";



export default function VocabularyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen bg-slate-200">

        <Container className="!flex items-center justify-center"> 
            {children}
        </Container>
    </main>
  );
}
