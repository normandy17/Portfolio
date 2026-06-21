import { useState } from "react";
import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const contactLinks = [
  { label: "charlesondavis@gmail.com", href: "mailto:charlesondavis@gmail.com", Icon: Mail },
  { label: "charleson-davis-marokey-2161b0b1", href: "https://www.linkedin.com/in/charleson-davis-marokey-2161b0b1/", Icon: Linkedin },
  { label: "github.com/normandy17", href: "https://github.com/normandy17", Icon: Github },
];

export default function Contact() {
  const { ref, isVisible } = useScrollFade();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    await emailjs.send(
    "service_mh9egyw",
    "template_kvzrkki",
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    "sXSbHjFoxpRtMjh0h"
  );
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>Contact</SectionHeading>

      <div
        ref={ref}
        className={`mt-12 max-w-2xl mx-auto text-center transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">Let's work together</h3>
        <p className="text-muted-foreground mb-8">
          Open to AI Engineer, Full Stack, and hybrid roles in Germany and remotely.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {contactLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-full hover:border-amber hover:text-amber transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>

        {/* Form */}
        {sent ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="p-3 rounded-full bg-amber/10">
              <CheckCircle className="h-8 w-8 text-amber" />
            </div>
            <p className="text-lg font-semibold">Message sent!</p>
            <p className="text-muted-foreground">I'll get back to you as soon as I can.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => setSent(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg h-11"
              />
              <Input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg h-11"
              />
            </div>
            <Textarea
              required
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-lg min-h-[140px] resize-none"
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={sending}
                className="bg-amber hover:bg-amber-hover text-white rounded-full px-8 h-11 font-medium"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {sending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}