import { useState } from "react";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

import Select from "react-tailwindcss-select";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";

type Props = {
  languages: Option[];
  locale: string;
};

const LanguagePicker: React.FC<Props> = ({ languages, locale }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState({
    label: t(
      `languages.${
        languages.find((language) => language.value === locale)?.label ??
        "English"
      }`
    ),
    value: locale ?? "en",
  });

  const onLanguageChange = (language: SelectValue) => {
    const language_ = language as Option;
    setLanguage({
      label: t(`languages.${language_?.label ?? "English"}`),
      value: language_?.value ?? "en",
    });
    router.replace(pathname, {
      locale: language_.value,
    });
  };

  return (
    <Select
      options={languages}
      value={language}
      onChange={onLanguageChange}
      primaryColor="emerald"
    ></Select>
  );
};

export { LanguagePicker };
