"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
"@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem } from
"@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Register GSAP plugins on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Category =
"Trending Shorts" |
"Montages" |
"AMV" |
"Car Edits" |
"Motion Graphics";

type VideoItem = {
  id: string;
  title: string;
  category: Category;
  driveId?: string;
  youtubeId?: string;
  aspect?: "9:16" | "16:9";
  thumbnail: string; // image url
};

const allVideos: VideoItem[] = [
// Trending Shorts (6)
{
  id: "tr0",
  title: "Trending Short — Featured",
  category: "Trending Shorts",
  youtubeId: "ivqAOpPmovw",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/ivqAOpPmovw/hqdefault.jpg"
},
{
  id: "tr1",
  title: "Trending Short #1",
  category: "Trending Shorts",
  youtubeId: "M7ZfvcOqoYk",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/M7ZfvcOqoYk/hqdefault.jpg"
},
{
  id: "tr2",
  title: "Trending Short #2",
  category: "Trending Shorts",
  youtubeId: "6Y5xhhNlFa8",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/6Y5xhhNlFa8/hqdefault.jpg"
},
{
  id: "tr3",
  title: "Trending Short #3",
  category: "Trending Shorts",
  youtubeId: "mOKcyvnqACc",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/mOKcyvnqACc/hqdefault.jpg"
},
{
  id: "tr4",
  title: "Trending Short #4",
  category: "Trending Shorts",
  youtubeId: "9BbkIQ2C1vY",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/9BbkIQ2C1vY/hqdefault.jpg"
},
{
  id: "tr5",
  title: "Trending Short #5",
  category: "Trending Shorts",
  youtubeId: "TGUXRiG15zY",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/TGUXRiG15zY/hqdefault.jpg"
},
{
  id: "tr6",
  title: "Trending Short #6",
  category: "Trending Shorts",
  youtubeId: "kb0mkOpE9z8",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/kb0mkOpE9z8/hqdefault.jpg"
},
{
  id: "tr7",
  title: "Trending Short #7",
  category: "Trending Shorts",
  youtubeId: "tbyIqlTzk84",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/tbyIqlTzk84/hqdefault.jpg"
},

// Montages (1)
{
  id: "mo1",
  title: "Montage — Highlight Cut",
  category: "Montages",
  youtubeId: "6Y5xhhNlFa8",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/6Y5xhhNlFa8/hqdefault.jpg"
},

// AMV (2)
{
  id: "amv1",
  title: "AMV — Sync Cut 1",
  category: "AMV",
  youtubeId: "mOKcyvnqACc",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/mOKcyvnqACc/hqdefault.jpg"
},
{
  id: "amv2",
  title: "AMV — Sync Cut 2",
  category: "AMV",
  youtubeId: "TGUXRiG15zY",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/TGUXRiG15zY/hqdefault.jpg"
},

// Car Edits (1)
{
  id: "car1",
  title: "Car Edit — Night Run",
  category: "Car Edits",
  youtubeId: "6Y5xhhNlFa8",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/6Y5xhhNlFa8/hqdefault.jpg"
},

// Motion Graphics (2)
{
  id: "mg1",
  title: "Motion Graphics — Logo Reveal",
  category: "Motion Graphics",
  youtubeId: "9BbkIQ2C1vY",
  aspect: "9:16",
  thumbnail: "https://i.ytimg.com/vi/9BbkIQ2C1vY/hqdefault.jpg"
},
{
  id: "mg2",
  title: "Motion Graphics — Animation Showcase",
  category: "Motion Graphics",
  youtubeId: "xb3CqGO5n8k",
  aspect: "16:9",
  thumbnail: "https://i.ytimg.com/vi/xb3CqGO5n8k/hqdefault.jpg"
}];


const categories: Category[] = [
"Trending Shorts",
"Montages",
"AMV",
"Car Edits",
"Motion Graphics"];


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Category>("Trending Shorts");
  const [dialogVideo, setDialogVideo] = useState<VideoItem | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Floating blobs in hero
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(".blob-1", { x: 30, y: -20, scale: 1.1, duration: 6, ease: "sine.inOut" }).
      to(".blob-2", { x: -20, y: 20, scale: 1.05, duration: 6, ease: "sine.inOut" }, 0).
      to(".blob-3", { x: 15, y: 25, scale: 0.95, duration: 7, ease: "sine.inOut" }, 0.3);

      // Reveal animations for sections
      const revealTargets = gsap.utils.toArray<HTMLElement>(
        ".reveal, .reveal-up, .reveal-card"
      );
      revealTargets.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%"
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => v.category === activeTab);
  }, [activeTab]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={heroRef} className="relative min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-primary/10 grid place-items-center">
              <span className="text-sm font-semibold">VE</span>
            </div>
            <span className="font-semibold">Video Editor Portfolio</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" onClick={() => scrollToId("portfolio")}>Portfolio</Button>
            <Button variant="ghost" onClick={() => scrollToId("about")}>About</Button>
            <Button variant="ghost" onClick={() => scrollToId("contact")}>Contact</Button>
            <Button onClick={() => scrollToId("contact")}>Hire Me</Button>
          </nav>
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-6 grid gap-2">
                  <Button variant="ghost" className="justify-start" onClick={() => {scrollToId("portfolio");setMobileOpen(false);}}>Portfolio</Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {scrollToId("about");setMobileOpen(false);}}>About</Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {scrollToId("contact");setMobileOpen(false);}}>Contact</Button>
                  <Button className="justify-start" onClick={() => {scrollToId("contact");setMobileOpen(false);}}>Hire Me</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="blob-1 absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
          <div className="blob-2 absolute top-20 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-2xl" />
          <div className="blob-3 absolute -bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-2xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 reveal-up">
            <Badge variant="secondary" className="rounded-full px-3 py-1 !whitespace-pre-line">3 Year Experience</Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Crafting engaging edits that keep viewers watching
            </h1>
            <p className="text-muted-foreground text-lg">
              I specialize in short-form content, montages, AMVs, car edits, and motion graphics. Let's bring your story to life with clean cuts, tight pacing, and polished visuals.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToId("portfolio")}>View Portfolio</Button>
              <Button variant="outline" onClick={() => scrollToId("contact")}>Contact Me</Button>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span>Trusted by creators and small brands</span>
            </div>
          </div>
          <div className="reveal-up">
            <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-border">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
                alt="Editing setup"
                className="h-full w-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" ref={sectionsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8 md:mb-12 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="text-muted-foreground mt-2">Browse by category and play videos.</p>
        </div>

        {/* Mobile filter select */}
        <div className="md:hidden mb-6 reveal">
          <Select value={activeTab} onValueChange={(v: Category) => setActiveTab(v)}>
            <SelectTrigger aria-label="Select category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Trending Shorts">Trending Shorts</SelectItem>
              <SelectItem value="Montages">Montages</SelectItem>
              <SelectItem value="AMV">AMV</SelectItem>
              <SelectItem value="Car Edits">Car Edits</SelectItem>
              <SelectItem value="Motion Graphics">Motion Graphics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Category)} className="reveal hidden md:block">
          <TabsList className="flex flex-wrap">
            {categories.map((c) =>
            <TabsTrigger key={c} value={c} className="capitalize">{c}</TabsTrigger>
            )}
          </TabsList>
          {categories.map((c) =>
          <TabsContent key={c} value={c} className="mt-6">
              {/* grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allVideos.
              filter((v) => v.category === c).
              map((v) =>
              <Card
                key={v.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow reveal-card">

                      <Dialog onOpenChange={(open) => !open && setDialogVideo(null)}>
                        <DialogTrigger asChild>
                          <button
                      className="text-left w-full"
                      onClick={() => setDialogVideo(v)}
                      aria-label={`Open ${v.title}`}>

                            <div className={`relative ${v.aspect === "9:16" ? "aspect-[9/16]" : "aspect-video"} overflow-hidden`}>
                              <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy" />

                              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                              <div className="absolute inset-0 grid place-items-center">
                                <Button size="sm" variant="secondary">Play</Button>
                              </div>
                            </div>
                            <CardHeader className="space-y-1">
                              <CardTitle className="text-base">{v.title}</CardTitle>
                              <div className="text-xs text-muted-foreground">{v.category}</div>
                            </CardHeader>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{dialogVideo?.title}</DialogTitle>
                          </DialogHeader>
                          <div className={`relative ${dialogVideo?.aspect === "9:16" ? "aspect-[9/16]" : "aspect-video"} overflow-hidden rounded-md ring-1 ring-border`}>
                            {dialogVideo?.youtubeId ?
                      <iframe
                        src={`https://www.youtube.com/embed/${dialogVideo.youtubeId}?rel=0`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                        title={dialogVideo?.title || "Video preview"} /> :

                      dialogVideo?.driveId ?
                      <iframe
                        src={`https://drive.google.com/file/d/${dialogVideo.driveId}/preview`}
                        allow="autoplay; fullscreen"
                        className="h-full w-full"
                        title={dialogVideo?.title || "Video preview"} /> :


                      <div className="grid h-full w-full place-items-center text-muted-foreground">
                                Video unavailable
                              </div>
                      }
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Card>
              )}
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* When using mobile select, render grid separately */}
        <div className="md:hidden">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredVideos.map((v) =>
            <Card key={v.id} className="group overflow-hidden hover:shadow-lg transition-shadow reveal-card">
                <Dialog onOpenChange={(open) => !open && setDialogVideo(null)}>
                  <DialogTrigger asChild>
                    <button className="text-left w-full" onClick={() => setDialogVideo(v)} aria-label={`Open ${v.title}`}>
                      <div className={`relative ${v.aspect === "9:16" ? "aspect-[9/16]" : "aspect-video"} overflow-hidden`}>
                        <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy" />

                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        <div className="absolute inset-0 grid place-items-center">
                          <Button size="sm" variant="secondary">Play</Button>
                        </div>
                      </div>
                      <CardHeader className="space-y-1">
                        <CardTitle className="text-base">{v.title}</CardTitle>
                        <div className="text-xs text-muted-foreground">{v.category}</div>
                      </CardHeader>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{dialogVideo?.title}</DialogTitle>
                    </DialogHeader>
                    <div className={`relative ${dialogVideo?.aspect === "9:16" ? "aspect-[9/16]" : "aspect-video"} overflow-hidden rounded-md ring-1 ring-border`}>
                      {dialogVideo?.youtubeId ?
                    <iframe
                      src={`https://www.youtube.com/embed/${dialogVideo.youtubeId}?rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      title={dialogVideo?.title || "Video preview"} /> :

                    dialogVideo?.driveId ?
                    <iframe
                      src={`https://drive.google.com/file/d/${dialogVideo.driveId}/preview`}
                      allow="autoplay; fullscreen"
                      className="h-full w-full"
                      title={dialogVideo?.title || "Video preview"} /> :


                    <div className="grid h-full w-full place-items-center text-muted-foreground">Video unavailable</div>
                    }
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 reveal">
              <h2 className="text-3xl font-bold">About Me</h2>
              <p className="mt-2 text-muted-foreground">
                I'm a video editor with one year of hands-on experience crafting edits for creators and small brands. I focus on pacing, sound design, clean transitions, and storytelling.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>On-time delivery</Badge>
                <Badge>Detail-oriented</Badge>
                <Badge>Client-first</Badge>
              </div>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <Card className="reveal-card">
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Short-form editing for Reels, TikTok, and YT Shorts</li>
                    <li>Montages and highlight edits</li>
                    <li>AMV synchronization and effects</li>
                    <li>Automotive edits with sound design</li>
                    <li>Motion graphics: intros, lower-thirds, logo reveals</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="reveal-card">
                <CardHeader>
                  <CardTitle>Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary">DaVinci Resolve</Badge>
                    <Badge variant="secondary">Alight Motion</Badge>
                    <Badge variant="secondary">CapCut</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials placeholder */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) =>
            <Card key={i} className="reveal-card">
                <CardContent className="pt-6 text-sm">
                  <p className="italic">"Amazing attention to detail and quick turnaround. Will work again."</p>
                  <div className="mt-4 text-xs text-muted-foreground">— Client Name</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold">Let's work together</h2>
            <p className="text-muted-foreground mt-2">
              Tell me about your project and timeline. I'll get back within 24 hours.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div>Email: <a className="underline" href="mailto:hello@example.com">hello@example.com</a></div>
              <div>Location: Remote • Worldwide</div>
            </div>
          </div>
          <Card className="reveal">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Video Editor Portfolio. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#portfolio" className="hover:underline">Portfolio</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>);

}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent("Project Inquiry — Video Editing");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
      </div>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <div>
        <label className="mb-1 block text-sm">Message</label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your project..." rows={5} required />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">I usually reply within 24 hours.</div>
        <Button type="submit">Send</Button>
      </div>
    </form>);

}