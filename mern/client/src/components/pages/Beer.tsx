import { AuthContext } from "@/contexts/AuthContext";
import { I18nContext } from "@/contexts/I18nContext";
import { UserContext } from "@/contexts/UserContext";
import { HttpContext } from "@/contexts/HttpContext";
import { use, type FC, useState, useEffect, type FormEvent } from "react";
import { Button } from "../ui/button";
import { LangSelector } from "../ui/lang-selector";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

const Beer: FC = () => {
    const { id } = useParams<{ id: string }>();
    const i18n = use(I18nContext);
    const auth = use(AuthContext);
    const userctx = use(UserContext);
    const http = use(HttpContext);
    const navigate = useNavigate();

    const [beer, setBeer] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBeer = async () => {
            try {
                const response = await http.fetch(`/beer/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    setBeer(data);
                    if (data.url) {
                        setPreview(http.image(data.url));
                    }
                } else {
                    toast.error(i18n.localization.networkError);
                }
            } catch (error) {
                toast.error(i18n.localization.networkError);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchBeer();
        }
    }, [id, http, i18n]);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await http.fetch(`/beer/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                toast.success(i18n.localization.successfulSave);
                navigate("/app/");
            } else {
                toast.error(i18n.localization.errorDuringSave);
            }
        } catch (error) {
            toast.error(i18n.localization.networkError);
        }
    };

    useEffect(() => {
        if (!selectedFile) {
            if (beer && beer.url) {
                setPreview(http.image(beer.url));
            }
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, beer]);

    const handleFileChange = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col ">
            <div className="sticky w-full top-0 flex justify-center bg-white/60 backdrop-blur-2xl px-8 py-4 z-10">
                <div className="w-full flex justify-between">
                    <div className="text-xl gradiant-text py-2">
                        Hello {userctx.user?.name}
                    </div>
                    <div className="flex space-x-2">
                        <LangSelector />
                        <Button variant="ghost" className="p-6" onClick={auth.signOut}>
                            {i18n.localization.signOut}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="flex flex-col flex-1 justify-center px-8">
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
                            <FieldLabel htmlFor="picture">{i18n.localization.picture}</FieldLabel>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleFileChange}
                            />
                            <FieldDescription>{i18n.localization.selectPictureToUpload}</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="name">{i18n.localization.name}</FieldLabel>
                            <Input id="name" name="name" defaultValue={beer?.name} placeholder="Pilsner" required className="p-6" />

                            <FieldLabel htmlFor="type">{i18n.localization.type}</FieldLabel>
                            <Select name="type" defaultValue={beer?.type} required>
                                <SelectTrigger id="type" className="p-6">
                                    <SelectValue placeholder={i18n.localization.selectType} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lager">Lager</SelectItem>
                                    <SelectItem value="ipa">IPA</SelectItem>
                                    <SelectItem value="apa">APA</SelectItem>
                                    <SelectItem value="stout">Stout</SelectItem>
                                    <SelectItem value="porter">Porter</SelectItem>
                                </SelectContent>
                            </Select>

                            <FieldLabel htmlFor="alcohol">{i18n.localization.alcoholContent}</FieldLabel>
                            <Input
                                id="alcohol"
                                name="alcohol"
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                defaultValue={beer?.alcohol}
                                placeholder="5.2"
                                required
                                className="p-6"
                            />

                            <FieldLabel htmlFor="rate">{i18n.localization.rate}</FieldLabel>
                            <Input
                                id="rate"
                                name="rate"
                                type="number"
                                min="1"
                                max="10"
                                defaultValue={beer?.rate}
                                placeholder="5"
                                required
                                className="p-6"
                            />

                            <FieldLabel htmlFor="note">{i18n.localization.noteOptional}</FieldLabel>
                            <Textarea
                                id="note"
                                name="note"
                                defaultValue={beer?.note}
                                placeholder={i18n.localization.notePlaceholder}
                                className="min-h-25 resize-none"
                            />
                        </Field>
                    </FieldGroup>
                </div>
                <div className="flex justify-center mt-2 space-x-2">
                    <Button type="button" onClick={() => navigate("/app/")} variant="outline" className="p-6 w-40">{i18n.localization.back}</Button>
                    <Button type="submit" className="p-6 w-40">{i18n.localization.save}</Button>
                </div>
            </form>
        </div>
    );
}

export default Beer;
