
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
  return (
    <section id="contact" className=" mt-20  relative bg-black min-h-80 py-20">
      {/* subtle scanline + backdrop */}
      <div aria-hidden className="absolute inset-0 pointer-events-none scanline-overlay opacity-30" />
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/60 opacity-40" />

      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-3xl font-mono font-bold text-center mb-12
                     text-transparent bg-clip-text bg-gradient-to-tl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700">
          &lt;/CONTACT&gt;
        </h2>

        <div className="flex justify-center gap-8 mb-8">
          {/* terminal-style contact card */}
          <div className="relative max-w-sm w-full neon-border neon-glow bg-black/70 p-4 rounded">
            <div className="flex items-center gap-3 mb-3">
              <div className="terminal-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="font-mono text-neonGreen text-sm">connect.sh</div>
            </div>

            <pre className="text-neonGreen/90 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed p-2 bg-black/30 rounded">
{`# reach me
email: arya.chikmagalur@gmail.com
github: github.com/Megarya27
linkedin: linkedin.com/in/arya-chikmagalur`}
            </pre>
          </div>

        </div>

        <div className="flex justify-center gap-8 mb-20">
          <a
            href="https://github.com/Megarya27" 
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="rounded-full p-2 border bg-gradient-to-bl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700 hover:bg-black group-hover:bg-black">
            <FaGithub className="w-8 h-8 text-black transition-all duration-300   
                                group-hover:scale-110 group-hover:text-white" />
                                </div>
          </a>

          <a
            href="mailto:arya.chikmagalur@gmail.com"
            className="group"
          >
            <div className="rounded-full p-2 border bg-gradient-to-bl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700 hover:bg-black group-hover:bg-black">
            <MdEmail className="w-8 h-8 text-black transition-all duration-300   
                                group-hover:scale-110 group-hover:text-white" />
                                </div>
          </a>

          <a
            href="https://www.linkedin.com/in/arya-chikmagalur/"
            target="_blank"
            rel="noopener noreferrer" 
            className="group"
          >
            <div className="rounded-full p-2 border bg-gradient-to-bl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700 hover:bg-black group-hover:bg-black">
            <FaLinkedin className="w-8 h-8 text-black transition-all duration-300   
                                group-hover:scale-110 group-hover:text-white" />
                                </div>
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-neonGreen/80 font-mono text-sm">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
          <p className="text-neonGreen/60 font-mono text-sm mt-2 neon-pulse">
            © {new Date().getFullYear()} ARYA CHIKMAGALUR. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;