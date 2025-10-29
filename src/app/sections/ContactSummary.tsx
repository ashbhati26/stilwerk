import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary: React.FC = () => {
  return (
    <section
      className="flex flex-col items-center justify-between py-28 gap-12"
    >
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-[#ff758f]">together</span> “
        </p>
      </div>
    </section>
  );
};

export default ContactSummary;
