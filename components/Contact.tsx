
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
  return (
    <section id="contact" className=" mt-20  relative bg-black min-h-80 py-20">
      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-3xl font-mono font-bold text-center mb-12
                     text-transparent bg-clip-text bg-gradient-to-tl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700">
          &lt;/CONTACT&gt;
        </h2>

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
        <footer className="text-center mt-96">
          <p className="text-transparent bg-clip-text bg-gradient-to-tl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700 text-sm">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-tl 
                     from-neonGreen via-neonGreen-300 to-neonGreen-700 text-sm mt-2">
            © {new Date().getFullYear()} ARYA CHIKMAGALUR. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;