import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Target, TrendingUp, Users } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Proposal Writing",
    description: "Convert cold leads into paying clients with high-converting proposal drafts.",
    features: [
      "Upwork/Fiverr specialized",
      "Cold email outreach",
      "LinkedIn DM optimization",
    ],
  },
  {
    icon: TrendingUp,
    title: "Price Negotiation",
    description: "Stop undercharging. Get the tools to defend your rates professionally.",
    features: [
      "Value-based anchoring",
      "Scope creep management",
      "Payment term structuring",
    ],
  },
  {
    icon: Users,
    title: "Client Retention",
    description: "Keep clients long-term with smooth project updates and follow-ups.",
    features: [
      "Project delay handling",
      "Testimonial requesting",
      "Upsell opportunities",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">

        {/* Header */}
        <section className="pt-20 pb-12 text-center container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Our Services
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to handle client communication like a pro.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-12 container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col border-border/50 hover:border-primary/30 transition">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 text-primary">
                    <service.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

                  <p className="text-muted-foreground mb-6 flex-1">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full rounded-xl h-12">
                    <Link to="/tool">Get Started</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 container max-w-7xl mx-auto px-4">
          <motion.div
            className="rounded-[2.5rem] bg-muted/50 p-12 md:p-20 text-center border border-border/50 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Ready to win more projects?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Join thousands of freelancers already using FreelancerReply AI.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-2xl h-14 px-10 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Link to="/tool">
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </section>

      </main>
    </div>
  );
}