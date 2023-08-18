import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {Raleway, Karla} from "next/font/google";
const raleway = Raleway({subsets: ["latin"]});
const karla = Karla({subsets: ["latin"]});

export default function App({Component, pageProps}) {
    return (
        <>
            <style jsx global>{`
                .raleway {
                    font-family: ${raleway.style.fontFamily};
                }
                .karla {
                    font-family: ${karla.style.fontFamily};
                }
            `}</style>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}
