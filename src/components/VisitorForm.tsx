import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, IdCard } from "lucide-react";
import MitsubishiLogo from "./MitsubishiLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const visitorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  employeeId: z.string().min(1, "Employee ID is required"),
});

type VisitorFormData = z.infer<typeof visitorSchema>;

interface VisitorFormProps {
  onSubmit: (data: VisitorFormData) => void;
}
// { onSubmit }: VisitorFormProps
const VisitorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      employeeId: "",
    },
  });

  const handleSubmit = async (data: VisitorFormData) => {
    console.log("Data", data);
    setIsSubmitting(true);
    try {
      // Simulate API call
      const res = await axios.post("register/", {
        full_name: data.name,
        email: data.email,
        phone_number: data.phone,
        employee_id: data.employeeId,
      });
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // onSubmit(res.data);
      toast({
        title: "Registration Successful",
        description: "Your visitor registration has been submitted.",
      });
      setTimeout(() => {
        localStorage.setItem("visitorData", JSON.stringify(res?.data));
        navigate("/thank-you");
      }, 1000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <MitsubishiLogo className="justify-center" />
          <CardTitle className="text-2xl font-bold text-mitsubishi-gray">
            Visitor Registration
          </CardTitle>
          <p className="text-muted-foreground">
            Please fill in your details to complete registration
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="focus:ring-mitsubishi-red"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                        className="focus:ring-mitsubishi-red"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="focus:ring-mitsubishi-red"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <IdCard className="w-4 h-4" />
                      Employee ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your employee ID"
                        {...field}
                        className="focus:ring-mitsubishi-red"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="mitsubishi"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorForm;