import { v4 as uuidv4 } from 'uuid';
import Heading from '@/components/heading/Heading';
import PostList from '@/components/post/PostList';
import getResume from '@/actions/resume';
import PostExtra from '@/components/post/PostExtra';

export default async function Home() {
  const data = await getResume();

  return (
    <div className="relative p-0 lg:pl-[30%]">
      <Heading person={data.person} />
      <main className="py-8 px-12">
        <div className="pb-1">
          <PostList title={data.work.title} list={data.work.experiences} />
          <PostList title={data.education.title} list={data.education.schools} />
          <PostList title={data.extra.title}>
            {data.extra.items.map((item) => (
              <PostExtra {...item} key={uuidv4()} />
            ))}
          </PostList>
        </div>
      </main>
      <footer className="text-sm text-slate-400 py-4 px-12 border-t-2 border-solid border-slate-200">
        © {new Date().getFullYear()}, Built with <a href="https://nextjs.org/">NextJS</a>
      </footer>
    </div>
  );
}
