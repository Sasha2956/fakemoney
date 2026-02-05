"use client";

import { createStoreSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Api } from "@/services/api-client";

export const CreateStoreForm = () => {
  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (values: z.infer<typeof createStoreSchema>) => {
    try {
      setLoading(false);
      setError(false);

      await Api.store.createStore(values);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={loading}
          disabled={!form.formState.isValid}
        >
          Create store
        </Button>
        {error && (
          <p className="text-destructive">Error while creating store</p>
        )}
      </form>
    </Form>
  );
};
