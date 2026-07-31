"use client";

import { useActionState, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/ui/lang-selector";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import LogoutAction from "@/actions/LogoutAction";
import CreateBeerAction from "@/actions/CreateBeerAction";

type CreateBeerProps = {
    userName?: string;
};

const CreateBeer = ({ userName }: CreateBeerProps) => {
    const { localization, language } = useI18n();
    const router = useRouter();
    const [state, formAction, pending] = useActionState(CreateBeerAction, {});

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const preview = useMemo(
        () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
        [selectedFile],
    );

    useEffect(() => {
        if (state.success && state.id) {
            toast.success(localization.successfulSave);
            router.push(`/${language}/app/beer/${state.id}/edit`);
        } else if (state.error) {
            toast.error(localization.errorDuringSave);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(null);
          return;
        }
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        if (!preview) return;
        return () => URL.revokeObjectURL(preview);
    }, [preview]);

    return (
        <div className="min-h-screen w-full flex flex-col ">
            <div className="sticky w-full top-0 flex justify-center bg-white/60 backdrop-blur-2xl px-8 py-4">
                <div className="w-full flex justify-between">
                    <div className="text-xl gradiant-text py-2">
                        Hello {userName}
                    </div>
                    <div className="flex space-x-2">
                        <LangSelector />
                        <form action={LogoutAction}>
                            <Button type="submit" variant="ghost" className="p-6">
                                {localization.signOut}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <form action={formAction} className="flex flex-col flex-1 justify-center px-8">
                <div className="flex justify-center w-full">
                    <FieldGroup className="grid max-w-xl grid-cols-2">
                        <Field>
                            <div className="relative w-40 aspect-square bg-amber-100 rounded-3xl">
                                {preview ? (
                                    <img
                                        className="object-cover aspect-square rounded-3xl"
                                        src={preview}
                                        alt="Upload preview"
                                        />
                                ) : (
                                    <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                )}
                            </div>
                            <FieldLabel htmlFor="picture">{localization.picture}</FieldLabel>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleFileChange}
                            />
                            <FieldDescription>{localization.selectPictureToUpload}</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="name">{localization.name}</FieldLabel>
                            <Input id="name" name="name" placeholder="Pilsner" required className="p-6" />

                            <FieldLabel htmlFor="type">{localization.type}</FieldLabel>
                                <Select name="type" required>
                                  <SelectTrigger id="type" className="p-6">
                                    <SelectValue placeholder={localization.selectType} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="lager">Lager</SelectItem>
                                    <SelectItem value="ipa">IPA</SelectItem>
                                    <SelectItem value="apa">APA</SelectItem>
                                    <SelectItem value="stout">Stout</SelectItem>
                                    <SelectItem value="porter">Porter</SelectItem>
                                  </SelectContent>
                            </Select>

                            <FieldLabel htmlFor="alcohol">{localization.alcoholContent}</FieldLabel>
                            <Input
                              id="alcohol"
                              name="alcohol"
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              placeholder="5.2"
                              required
                              className="p-6"
                            />

                            <FieldLabel htmlFor="rate">{localization.rate}</FieldLabel>
                            <Input
                              id="rate"
                              name="rate"
                              type="number"
                              min="1"
                              max="10"
                              placeholder="5"
                              required
                              className="p-6"
                            />

                            <FieldLabel htmlFor="note">{localization.noteOptional}</FieldLabel>
                                <Textarea
                                  id="note"
                                  name="note"
                                  placeholder={localization.notePlaceholder}
                                  className="min-h-25 resize-none"
                                />
                        </Field>
                    </FieldGroup>
                </div>
                <div className="flex justify-center mt-2 space-x-2">
                    <Button type="button" onClick={() => router.push(`/${language}/app`)} variant="outline" className="p-6 w-40">{localization.back}</Button>
                    <Button type="submit" disabled={pending} className="p-6 w-40">{localization.save}</Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBeer;
