import NavBar from '@/components/layout/NavBar';
import CourseCard from '@/components/simple/CourseCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import sanity from '@/lib/sanity';
import { Course, CourseCategory } from '@/types';
import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>(
    []
  );
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const courseData =
          await sanity.fetch(`*[_type == "course"] | order(updatedAt desc) {
          "id": _id,
          title,
          description,
          duration,
          "instructor": instructor->name,
          "categories": categories[]->,
          linkToCourse,
          "author": author->name,
          "imageUrl": image.asset->url,
          "imageAlt": image.asset->alt,
          "createdAt": _createdAt,
          "updatedAt": _updatedAt
        }`);
        setCourses(courseData);

        const categoryData =
          await sanity.fetch(`*[_type == "courseCategory"] | order(updatedAt desc) {
          "id": _id,
          title,
          description,
          "author": author->name,
          "createdAt": _createdAt,
          "updatedAt": _updatedAt
        }`);
        setCourseCategories(categoryData);
      } catch (error) {
        console.error('An error occurred while trying to fetch data', error);
        Notify.failure('Error fetching data, please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredCourses(
        courses.filter((course) =>
          course.categories.some((category) =>
            category.title.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [filter, courses]);

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-dvh pt-[100px] lg:pt-[150px] px-5 pb-10">
        <div className="flex justify-between">
          <h1 className="text-xl sm:text-3xl font-bold">Courses</h1>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {courseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.title}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 grid gap-5">
          {loading ? (
            <div className="flex flex-wrap justify-center gap-5 lg:px-32">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-loader w-full h-40" />
              ))}
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-center text-lg">
                  {filter
                    ? 'No course found under category.'
                    : 'No courses found, please check back later.'}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CoursesPage;
