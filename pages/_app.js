import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {Raleway, Karla} from "next/font/google";
import {useEffect} from "react";
const raleway = Raleway({subsets: ["latin"]});
const karla = Karla({subsets: ["latin"]});

export default function App({Component, pageProps}) {
    useEffect(() => {
        const loadScript = (src, callbackName) => {
            const existingScript = document.querySelector(
                `script[src="${src}"]`
            );
            if (existingScript) {
                return;
            }
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleMapsScriptLoaded = () => {
            if (window.initAutocomplete) {
                window.initAutocomplete();
            }
            if (window.initMap) {
                window.initMap();
            }
        };

        loadScript(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDv7zbUva4oy7ni_A7sKFYTpuE7yBhlz1E&libraries=places&callback=googleMapsScriptLoaded"
        );
    }, []);

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
