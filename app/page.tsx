
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CustomCursor from "@/components/CustomCursor";
import Skills from "@/components/Skills";
import { Vortex } from "@/components/ui/vortex";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <CustomCursor />
      <div className="w-screen h-screen">
        <Hero />
        </div>
      
      <div className=" bg-black w-screen h-full">
      <Vortex
                backgroundColor="transparent"
                rangeY={300}
                particleCount={10}
                baseHue={80}
                className=" w-screen h-full"
            >
        <About/>
        <Skills/>
        <Projects/>
        <Contact/>
        </Vortex>
      </div>
    </main>
  );
}
