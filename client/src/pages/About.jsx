import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">

        {/* Header */}
        <section className="pt-20 pb-16 text-center container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              About FreelancerReply AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to help freelancers communicate with confidence
              and win more projects.
            </p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="py-16 container max-w-4xl mx-auto px-4 space-y-20">

          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">The Problem</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Freelancing is 50% doing the work and 50% managing clients. Many
              freelancers lose deals not because they lack skills, but because
              they struggle to communicate their value, defend their pricing,
              or handle difficult conversations.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Our Solution</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FreelancerReply AI acts as your senior communication consultant.
              It generates professional replies designed to help freelancers
              close deals, respond confidently, and manage clients effectively.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[
              {
                title: "Instant",
                desc: "Generate replies in under 5 seconds.",
                icon: Zap,
              },
              {
                title: "Professional",
                desc: "Built with freelance communication psychology.",
                icon: Shield,
              },
              {
                title: "Proven",
                desc: "Used by top-rated freelancers worldwide.",
                icon: CheckCircle2,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 text-center h-full border-border/50 hover:border-primary/30 transition">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-12"
          >
            <Button
              asChild
              size="lg"
              className="rounded-2xl h-14 px-10 text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <Link to="/tool">
                Start Generating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

        </section>
      </main>
    </div>
  );
}