import { NoteDoneIcon, StickyNote01Icon } from "@/components/icons";
import AddNoteDialog from "@/components/Notes/AddNoteDialog";
import NoteCard from "@/components/Notes/NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface Note {
  title: string;
  description: string;
  category: string;
}

export default function Notes() {
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    // Groceries
    {
      title: "Shopping List",
      description: "Milk, Bread, Eggs",
      category: "Groceries",
    },
    {
      title: "Grocery Needs",
      description: "Fruits, Vegetables",
      category: "Groceries",
    },
    {
      title: "Meal Prep Ideas",
      description: "Chicken, Quinoa, Veggies",
      category: "Groceries",
    },
    {
      title: "Seasonal Recipes",
      description: "Pumpkin pie, Grilled veggies",
      category: "Groceries",
    },
    {
      title: "Recipes to Try",
      description: "Pasta, Tacos, Sushi",
      category: "Groceries",
    },
    {
      title: "Essential Kitchen Tools",
      description: "Knives, Cutting boards",
      category: "Groceries",
    },

    // Leisure
    {
      title: "Weekend Plans",
      description: "Hiking and reading",
      category: "Leisure",
    },
    {
      title: "Fun Date Ideas",
      description: "Picnic, Movie night",
      category: "Leisure",
    },
    {
      title: "Seasonal Activities",
      description: "Apple picking, Skiing",
      category: "Leisure",
    },
    {
      title: "Local Attractions to Visit",
      description: "Museums, Parks",
      category: "Leisure",
    },
    {
      title: "Outdoor Activities",
      description: "Camping, Cycling",
      category: "Leisure",
    },
    {
      title: "Upcoming Concerts",
      description: "Artist, Date, Venue",
      category: "Leisure",
    },

    // Personal Growth
    {
      title: "Daily Affirmations",
      description: "I am strong, I am capable",
      category: "Personal Growth",
    },
    {
      title: "Personal Development Goals",
      description: "Public speaking, Time management",
      category: "Personal Growth",
    },
    {
      title: "Inspirational Books",
      description: "Atomic Habits, The Power of Now",
      category: "Personal Growth",
    },
    {
      title: "Mindfulness Practices",
      description: "Meditation, Journaling",
      category: "Personal Growth",
    },
    {
      title: "Health Goals",
      description: "Drink more water, Sleep early",
      category: "Personal Growth",
    },
    {
      title: "New Skills to Learn",
      description: "Guitar, Spanish, Coding",
      category: "Personal Growth",
    },

    // Travel
    {
      title: "Travel Bucket List",
      description: "Japan, Italy, Brazil",
      category: "Travel",
    },
    {
      title: "Essential Travel Items",
      description: "Passport, Charger, Snacks",
      category: "Travel",
    },
    {
      title: "Travel Tips",
      description: "Packing light, Staying safe",
      category: "Travel",
    },
    {
      title: "Weekend Getaway Ideas",
      description: "Beach, Cabin in the woods",
      category: "Travel",
    },
    {
      title: "Favorite Travel Memories",
      description: "Road trips, Beach vacations",
      category: "Travel",
    },
    {
      title: "Local Attractions to Visit",
      description: "Museums, Parks",
      category: "Travel",
    },

    // Fitness
    {
      title: "Workout Routine",
      description: "Push-ups, Squats, Running",
      category: "Fitness",
    },
    {
      title: "Fitness Challenges",
      description: "30-day plank, Step goals",
      category: "Fitness",
    },
    {
      title: "Healthy Recipes",
      description: "Salads, Smoothies",
      category: "Fitness",
    },
    {
      title: "Yoga Practices",
      description: "Sun Salutations, Warrior Pose",
      category: "Fitness",
    },
    {
      title: "Running Goals",
      description: "5K training, Weekly mileage",
      category: "Fitness",
    },
    {
      title: "Home Workout Equipment",
      description: "Dumbbells, Resistance bands",
      category: "Fitness",
    },
  ]);

  const [categories, setCategories] = useState<string[]>([
    "Groceries",
    "Leisure",
    "Reading",
    "Fitness",
    "Entertainment",
    "Travel",
    "Cooking",
    "Shopping",
    "Personal Growth",
    "Learning",
    "Home",
    "Inspiration",
    "Community Service",
    "Finance",
    "Events",
    "Writing",
    "Education",
    "Career",
    "Health",
    "Social Media",
    "Pets",
    "Fashion",
    "Technology",
    "Mental Health",
    "Family",
    "Productivity",
    "Culture",
    "Nostalgia",
    "Music",
    "Relationships",
    "Planning",
    "Safety",
    "Internet",
  ]);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const notesByCategory = categories.reduce((acc, category) => {
    const filteredNotes = notes.filter((note) => note.category === category);
    if (filteredNotes.length > 0) {
      acc[category] = filteredNotes; // Add only non-empty categories
    }
    return acc;
  }, {} as Record<string, Note[]>);

  const nonEmptyCategories = categories.filter(
    (category) => notesByCategory[category]
  );
  const emptyCategories = categories.filter(
    (category) => !(category in notesByCategory)
  );
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex flex-wrap gap-4 justify-start pb-8">
            {nonEmptyCategories.map((category) => (
              <div
                key={category}
                className="flex flex-col bg-black p-[1em] rounded-2xl bg-opacity-20 gap-3 max-w-[30%] min-w-[30%] aspect-square"
              >
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="flex flex-wrap gap-4">
                  {notesByCategory[category].map((note, index) => (
                    <NoteCard key={index} note={note} />
                  ))}
                </div>
              </div>
            ))}

            {emptyCategories.map((category) => (
              <div
                key={category}
                className="flex flex-col bg-black p-[1em] rounded-2xl bg-opacity-20 gap-3 max-w-[30%] min-w-[30%] aspect-square"
              >
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="flex flex-wrap gap-4">
                  {/* Optionally render a message or leave it empty */}
                  <p>No notes available</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-6 flex justify-center items-center w-full z-10">
          <Button
            variant="shadow"
            color="primary"
            size="lg"
            radius="full"
            className="font-semibold gap-1"
            onPress={() => setOpenDialog(true)}
          >
            <StickyNote01Icon width={27} height={27} />
            Add Note
          </Button>
        </div>
        <div className="bg-custom-gradient2 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
      <AddNoteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        categories={categories}
        addNote={addNote}
      />
    </>
  );
}
