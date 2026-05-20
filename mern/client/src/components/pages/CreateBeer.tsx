import { AuthContext } from "@/contexts/AuthContext";
import { I18nContext } from "@/contexts/I18nContext";
import { UserContext } from "@/contexts/UserContext";
import { HttpContext } from "@/contexts/HttpContext";
import { use, type FC, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LangSelector } from "../ui/lang-selector";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";

const CreateBeer: FC = () => {

    const i18n = use(I18nContext);
    const auth = use(AuthContext);
    const userctx = use(UserContext);
    const http = use(HttpContext);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);


    };

    useEffect(() => {
        if (!selectedFile) {
          setPreview(null);
          return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);

      const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(null);
          return;
        }
        setSelectedFile(e.target.files[0]);
      };

    return (
        <div className="min-h-screen w-full flex flex-col *:px-8 *:py-4">
            <div className="sticky w-full top-0 flex justify-center bg-white/60 backdrop-blur-2xl">
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

            <form onSubmit={submit} className="flex flex-1 justify-center">
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
                        <FieldLabel htmlFor="picture">Picture</FieldLabel>
                        <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleFileChange}
                        />
                        <FieldDescription>Select a picture to upload.</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" name="name" placeholder="Pilsner" required className="p-6" />

                        <FieldLabel htmlFor="type">Típus</FieldLabel>
                            <Select name="type" required>
                              <SelectTrigger id="type" className="p-6">
                                <SelectValue placeholder="Válassz típust" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lager">Lager</SelectItem>
                                <SelectItem value="ipa">IPA</SelectItem>
                                <SelectItem value="apa">APA</SelectItem>
                                <SelectItem value="stout">Stout</SelectItem>
                                <SelectItem value="porter">Porter</SelectItem>
                              </SelectContent>
                        </Select>

                        <FieldLabel htmlFor="alcohol">Alkoholtartalom (%)</FieldLabel>
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

                        <FieldLabel htmlFor="rate">Értékelés (1-5)</FieldLabel>
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

                        <FieldLabel htmlFor="note">Megjegyzés (Opcionális)</FieldLabel>
                            <Textarea
                              id="note"
                              name="note"
                              placeholder="Írd le a benyomásaidat az ízvilágról..."
                              className="min-h-25 resize-none"
                            />
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}

export default CreateBeer;
