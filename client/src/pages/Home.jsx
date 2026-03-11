import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "./Home.css";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                AI powered client communication
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Generate Professional Client <br />
                <span className="text-primary">Replies in 5 Seconds</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stop overthinking client messages. Get structured, confident,
                ready-to-send replies instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <Link to="/tool">
                    Generate Reply Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Logo Slider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="logo-slider"
              >
                <div className="logo-track">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="logo-item">
                      <span className="logo-text">Powered by</span>
                      <div className="logo-box">
                        <img
                          src="/thrive_logo_no_bg.png"
                          alt="Thrive Grit Logo"
                          className="logo-img"
                        />
                        <span className="logo-name">
                          Thrive Grit Business Solutions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Decorative background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Three simple steps to a perfect reply.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Paste Message",
                  description: "Paste the client message you need to reply to.",
                  icon: MessageSquare,
                },
                {
                  step: "02",
                  title: "Choose Options",
                  description: "Select situation type, tone, and add your service details.",
                  icon: Zap,
                },
                {
                  step: "03",
                  title: "Get Reply",
                  description: "Get a professional, ready-to-send reply in seconds.",
                  icon: Shield,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <span className="absolute top-4 right-6 text-4xl font-bold text-muted/20">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  Why use FreelancerReply AI?
                </h2>

                <div className="space-y-6">
                  {[
                    "Win more projects with professional proposals",
                    "Save hours of writing and editing",
                    "Handle difficult client situations with confidence",
                    "Completely free with unlimited generations",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="rounded-2xl h-14 px-8">
                  <Link to="/tool">Start Generating Now</Link>
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center p-8">
                  <div className="w-full aspect-video bg-card rounded-2xl shadow-2xl border border-border/50 flex flex-col p-4 space-y-3">
                    <div className="h-2 w-1/3 bg-muted rounded-full" />
                    <div className="h-2 w-full bg-muted/50 rounded-full" />
                    <div className="h-2 w-full bg-muted/50 rounded-full" />
                    <div className="h-2 w-2/3 bg-muted/50 rounded-full" />
                    <div className="mt-auto h-8 w-1/4 bg-primary rounded-lg self-end" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}