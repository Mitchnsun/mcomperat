'use server'

import { promises as fs } from 'fs'
import defaultResume from "@/assets/data/fr.json"
import { ResumeData } from '@/types/all';

export default async function getResume(lang: string | undefined  = 'fr'): Promise<ResumeData> {
  let data: ResumeData;
  try {
    const file = await fs.readFile(`${process.cwd()}/src/assets/data/${lang}.json`, 'utf8');
    data = JSON.parse(file);
  } catch (er) {
    console.log(`Error reading file with lang ${lang}`, er)
    data = defaultResume;
  }

  return Promise.resolve(data)
}