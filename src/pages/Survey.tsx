import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Link } from "lucide-react";

function Survey() {
  const [nav, setNav] = useState<number>(1);
  const totalPages = 10;
  const [progress, setProgress] = useState<number>(0);
  const nextNav = () => {
    (setNav((n) => Math.min(totalPages, n + 1)), setProgress(nav * 10));
  };
  const prevNav = () => setNav((n) => Math.max(1, n - 1));
  const cardClassName =
    "w-full max-w-240 border-secondary/25 bg-background/95 shadow-[0_10px_24px_-20px_var(--color-primary)] backdrop-blur-sm";
  const navButtonClassName =
    "rounded-full border border-secondary p-2 text-primary-foreground bg-primary transition-all duration-200 cursor-pointer hover:bg-secondary";

  const [q1, setq1] = useState("Prefer not to say");
  const [q2, setq2] = useState({
    Alcohol: false,
    Marijuana: false,
    PrescriptionPainMedicationNotPrescribedToYou: false,
    PrescriptionMedicationInAWayNotPrescribed: false,
    Cocaine: false,
    Heroin: false,
    FentanylOrUnknownStreetPills: false,
    VapingNicotine: false,
    Other: false,
    PreferNotToSay: true,
  });
  const [q3, setq3] = useState("Prefer not to say");
  const [q4, setq4] = useState({
    Academics: false,
    MentalHealth: false,
    Relationships: false,
    Finances: false,
    PhysicalHealth: false,
    NotAffectedMe: false,
    PreferNotToSay: true,
  });
  const [q5, setq5] = useState("Unsure");
  const [q6, setq6] = useState("Unsure");
  const [q7, setq7] = useState("No");

  const [q8, setq8] = useState({
    SocialMedia: false,
    CampusEvents: false,
    Email: false,
    PostersFlyers: false,
    ClassroomPresentations: false,
    StudentOrgs: false,
  });
  const [q9, setq9] = useState("");
  const [q10, setq10] = useState("");

  const toggleFilter = (key: keyof typeof q4) => {
    setq4((prev) => {
      const newState = { ...prev, [key]: !prev[key] };

      if (key === "PreferNotToSay" && newState.PreferNotToSay) {
        return {
          Academics: false,
          MentalHealth: false,
          Relationships: false,
          Finances: false,
          PhysicalHealth: false,
          NotAffectedMe: false,
          PreferNotToSay: true,
        };
      }

      if (key !== "PreferNotToSay" && newState[key]) {
        newState.PreferNotToSay = false;
      }

      return newState;
    });
  };

  const toggleQ2 = (key: keyof typeof q2) => {
    setq2((prev) => {
      const newState = { ...prev, [key]: !prev[key] };

      if (key === "PreferNotToSay" && newState.PreferNotToSay) {
        return {
          Alcohol: false,
          Marijuana: false,
          PrescriptionPainMedicationNotPrescribedToYou: false,
          PrescriptionMedicationInAWayNotPrescribed: false,
          Cocaine: false,
          Heroin: false,
          FentanylOrUnknownStreetPills: false,
          VapingNicotine: false,
          Other: false,
          PreferNotToSay: true,
        };
      }

      if (key !== "PreferNotToSay" && newState[key]) {
        newState.PreferNotToSay = false;
      }

      return newState;
    });
  };

  const toggleQ8 = (key: keyof typeof q8) => {
    setq8((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pages = [
    <Card key={1} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 1
        </CardDescription>
        <CardAction className="text-muted-foreground">1 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>Have you ever used drugs or misused prescription medication?</h2>
          <RadioGroup defaultValue={q1}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Yes"
                onClick={() => setq1("Yes")}
                id="q1-1"
              />
              <Label htmlFor="q1-1">Yes</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="No"
                onClick={() => setq1("No")}
                id="q1-2"
              />
              <Label htmlFor="q1-2">No</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Prefer not to say"
                onClick={() => setq1("Prefer not to say")}
                id="q1-3"
              />
              <Label htmlFor="q1-3">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={2} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 2
        </CardDescription>
        <CardAction className="text-muted-foreground">2 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>Which substances have you used? (Select all that apply)</h2>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.Alcohol}
              onCheckedChange={() => toggleQ2("Alcohol")}
              id="q2-1"
            />
            <Label htmlFor="q2-1">Alcohol</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.Marijuana}
              onCheckedChange={() => toggleQ2("Marijuana")}
              id="q2-2"
            />
            <Label htmlFor="q2-2">Marijuana</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.PrescriptionPainMedicationNotPrescribedToYou}
              onCheckedChange={() =>
                toggleQ2("PrescriptionPainMedicationNotPrescribedToYou")
              }
              id="q2-3"
            />
            <Label htmlFor="q2-3">
              Prescription pain medication not prescribed to you (e.g.,
              oxycodone, Percocet)
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.PrescriptionMedicationInAWayNotPrescribed}
              onCheckedChange={() =>
                toggleQ2("PrescriptionMedicationInAWayNotPrescribed")
              }
              id="q2-4"
            />
            <Label htmlFor="q2-4">
              Prescription medication in a way not prescribed
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.Cocaine}
              onCheckedChange={() => toggleQ2("Cocaine")}
              id="q2-5"
            />
            <Label htmlFor="q2-5">Cocaine</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.Heroin}
              onCheckedChange={() => toggleQ2("Heroin")}
              id="q2-6"
            />
            <Label htmlFor="q2-6">Heroin</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.FentanylOrUnknownStreetPills}
              onCheckedChange={() => toggleQ2("FentanylOrUnknownStreetPills")}
              id="q2-7"
            />
            <Label htmlFor="q2-7">Fentanyl or unknown street pills</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.VapingNicotine}
              onCheckedChange={() => toggleQ2("VapingNicotine")}
              id="q2-8"
            />
            <Label htmlFor="q2-8">Vaping/Nicotine</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.Other}
              onCheckedChange={() => toggleQ2("Other")}
              id="q2-9"
            />
            <Label htmlFor="q2-9">Other</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q2.PreferNotToSay}
              onCheckedChange={() => toggleQ2("PreferNotToSay")}
              id="q2-10"
            />
            <Label htmlFor="q2-10">Prefer not to say</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={3} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 3
        </CardDescription>
        <CardAction className="text-muted-foreground">3 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>How often do you currently use any substance?</h2>
          <RadioGroup defaultValue={q3}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Never"
                onClick={() => setq3("Never")}
                id="q3-1"
              />
              <Label htmlFor="q3-1">Never</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Rarely (a few times a year)"
                onClick={() => setq3("Rarely (a few times a year)")}
                id="q3-2"
              />
              <Label htmlFor="q3-2">Rarely (a few times a year)</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Occasionally (monthly)"
                onClick={() => setq3("Occasionally (monthly)")}
                id="q3-3"
              />
              <Label htmlFor="q3-3">Occasionally (monthly)</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Regularly (weekly)"
                onClick={() => setq3("Regularly (weekly)")}
                id="q3-4"
              />
              <Label htmlFor="q3-4">Regularly (weekly)</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Daily"
                onClick={() => setq3("Daily")}
                id="q3-5"
              />
              <Label htmlFor="q3-5">Daily</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Prefer not to say"
                onClick={() => setq3("Prefer not to say")}
                id="q3-6"
              />
              <Label htmlFor="q3-6">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={4} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 4
        </CardDescription>
        <CardAction className="text-muted-foreground">4 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>
            Do you feel your substance use has ever negatively affected your:
          </h2>
          <p>(Select all that apply)</p>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.Academics}
              onCheckedChange={() => toggleFilter("Academics")}
              id="q4-1"
            />
            <Label htmlFor="q4-1">Academics</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.MentalHealth}
              onCheckedChange={() => toggleFilter("MentalHealth")}
              id="q4-2"
            />
            <Label htmlFor="q4-2">Mental Health</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.Relationships}
              onCheckedChange={() => toggleFilter("Relationships")}
              id="q4-3"
            />
            <Label htmlFor="q4-3">Relationships</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.Finances}
              onCheckedChange={() => toggleFilter("Finances")}
              id="q4-4"
            />
            <Label htmlFor="q4-4">Finances</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.PhysicalHealth}
              onCheckedChange={() => toggleFilter("PhysicalHealth")}
              id="q4-5"
            />
            <Label htmlFor="q4-5">Physical Health</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.NotAffectedMe}
              onCheckedChange={() => toggleFilter("NotAffectedMe")}
              id="q4-6"
            />
            <Label htmlFor="q4-6">It has not affected me</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q4.PreferNotToSay}
              onCheckedChange={() => toggleFilter("PreferNotToSay")}
              id="q4-7"
            />
            <Label htmlFor="q4-7">Prefer not to say</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={5} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 5
        </CardDescription>
        <CardAction className="text-muted-foreground">5 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>Have you ever felt concerned about your own substance use?</h2>
          <RadioGroup defaultValue={q5}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Yes"
                onClick={() => setq5("Yes")}
                id="q5-1"
              />
              <Label htmlFor="q5-1">Yes</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="No"
                onClick={() => setq5("No")}
                id="q5-2"
              />
              <Label htmlFor="q5-2">No</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Unsure"
                onClick={() => setq5("Unsure")}
                id="q5-3"
              />
              <Label htmlFor="q5-3">Unsure</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={6} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 6
        </CardDescription>
        <CardAction className="text-muted-foreground">6 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>
            Do you know where to find help on campus for substance use concerns?
          </h2>
          <RadioGroup defaultValue={q6}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Yes"
                onClick={() => setq6("Yes")}
                id="q6-1"
              />
              <Label htmlFor="q6-1">Yes</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="No"
                onClick={() => setq6("No")}
                id="q6-2"
              />
              <Label htmlFor="q6-2">No</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Unsure"
                onClick={() => setq6("Unsure")}
                id="q6-3"
              />
              <Label htmlFor="q6-3">Unsure</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={7} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 7
        </CardDescription>
        <CardAction className="text-muted-foreground">7 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>
            Would you like more information about substance use resources?
          </h2>
          <RadioGroup defaultValue={q7}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Yes"
                onClick={() => setq7("Yes")}
                id="q7-1"
              />
              <Label htmlFor="q7-1">Yes</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="No"
                onClick={() => setq7("No")}
                id="q7-2"
              />
              <Label htmlFor="q7-2">No</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={8} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 8
        </CardDescription>
        <CardAction className="text-muted-foreground">8 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>
            What is the best way for the university to share information about
            substance use and support?
          </h2>
          <p>(Select all that apply)</p>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.SocialMedia}
              onCheckedChange={() => toggleQ8("SocialMedia")}
              id="q8-1"
            />
            <Label htmlFor="q8-1">Social media</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.CampusEvents}
              onCheckedChange={() => toggleQ8("CampusEvents")}
              id="q8-2"
            />
            <Label htmlFor="q8-2">Campus events</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.Email}
              onCheckedChange={() => toggleQ8("Email")}
              id="q8-3"
            />
            <Label htmlFor="q8-3">Email</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.PostersFlyers}
              onCheckedChange={() => toggleQ8("PostersFlyers")}
              id="q8-4"
            />
            <Label htmlFor="q8-4">Posters/Flyers</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.ClassroomPresentations}
              onCheckedChange={() => toggleQ8("ClassroomPresentations")}
              id="q8-5"
            />
            <Label htmlFor="q8-5">Classroom presentations</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q8.StudentOrgs}
              onCheckedChange={() => toggleQ8("StudentOrgs")}
              id="q8-6"
            />
            <Label htmlFor="q8-6">Student organizations</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={9} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 9
        </CardDescription>
        <CardAction className="text-muted-foreground">9 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>(Optional) What is your current academic level?</h2>
          <p>(Select one; you can deselect to leave empty)</p>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q9 === "Freshman"}
              onCheckedChange={() =>
                setq9((prev) => (prev === "Freshman" ? "" : "Freshman"))
              }
              id="q9-1"
            />
            <Label htmlFor="q9-1">Freshman</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q9 === "Sophomore"}
              onCheckedChange={() =>
                setq9((prev) => (prev === "Sophomore" ? "" : "Sophomore"))
              }
              id="q9-2"
            />
            <Label htmlFor="q9-2">Sophomore</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q9 === "Junior"}
              onCheckedChange={() =>
                setq9((prev) => (prev === "Junior" ? "" : "Junior"))
              }
              id="q9-3"
            />
            <Label htmlFor="q9-3">Junior</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q9 === "Senior"}
              onCheckedChange={() =>
                setq9((prev) => (prev === "Senior" ? "" : "Senior"))
              }
              id="q9-4"
            />
            <Label htmlFor="q9-4">Senior</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={q9 === "Graduate student"}
              onCheckedChange={() =>
                setq9((prev) =>
                  prev === "Graduate student" ? "" : "Graduate student",
                )
              }
              id="q9-5"
            />
            <Label htmlFor="q9-5">Graduate student</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            className={`float-right ${navButtonClassName}`}
            onClick={nextNav}
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </CardFooter>
    </Card>,

    <Card key={10} className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Survey
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Question 10
        </CardDescription>
        <CardAction className="text-muted-foreground">10 / 10</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h2>(Optional) Anything else you'd like us to know?</h2>
          <Textarea
            value={q10}
            onChange={(e) => setq10((e as any).target.value)}
            className="rounded-none border-0 border-b-2 border-secondary/45 shadow-none focus-visible:ring-primary"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative w-full h-fit">
          <div className={`float-left ${navButtonClassName}`} onClick={prevNav}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div className="float-right cursor-pointer rounded-full">
            <Button className="bg-primary text-primary-foreground hover:bg-secondary rounded-full cursor-pointer">
              Submit
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>,
  ];

  return (
        <div className="bg-background">
          {/* Hero Section */}

          <HeroSection
            badge="Student Survey"
            headline="Share Your Experience"
            description="Your anonymous feedback helps us improve resources and support. This short survey takes about 5 minutes to complete."
            ctaButtons={[
              {
                label: "Start Survey",
                isPrimary: true,
                href: "https://forms.cloud.microsoft/r/AbAbkgpjHP?origin=lprLink",
              },
            ]}
          />

          {/* Survey Content */}
          {false && (
            <section className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
              <div className="bg-card/50 border border-secondary/25 rounded-xl p-8 max-w-2xl text-center">
                <Link className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" />
                <p className="text-lg font-semibold text-foreground">
                  Survey Coming Soon
                </p>
                <p className="mt-3 text-muted-foreground">
                  We're preparing a comprehensive survey to better understand
                  your experiences and health concerns. Check back soon to share
                  your feedback!
                </p>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4 border-t border-secondary/25">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
                About This Survey
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Privacy Matters
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    All responses are completely anonymous and confidential. We
                    never collect personally identifiable information.
                  </p>
                </div>
                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Takes 5 Minutes
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Quick, straightforward questions designed to gather
                    meaningful insights without taking up too much of your time.
                  </p>
                </div>
                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Helps Our Mission
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Your feedback directly impacts how we develop resources and
                    support services for your campus community.
                  </p>
                </div>
                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    No Wrong Answers
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    We value your honest thoughts, whether you plan or don't
                    plan to take the survey, share your true perspective.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
  );
}

export default Survey;
