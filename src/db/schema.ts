import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const appointmentStatus = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  image: text("image").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull().default(0),
  durationMin: integer("duration_min").notNull().default(60),
  image: text("image").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  active: boolean("active").notNull().default(true),
});

export const professionals = pgTable("professionals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  avatar: text("avatar").notNull().default(""),
  bio: text("bio").notNull().default(""),
  active: boolean("active").notNull().default(true),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  professionalId: integer("professional_id").references(() => professionals.id),
  clientName: text("client_name").notNull(),
  clientPhone: text("client_phone").notNull(),
  startsAt: timestamp("starts_at"),
  status: appointmentStatus("status").notNull().default("pending"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull().default(5),
  treatment: text("treatment").notNull().default(""),
  approved: boolean("approved").notNull().default(false),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sort: integer("sort").notNull().default(0),
});
