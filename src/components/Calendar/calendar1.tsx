'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Plus, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

type Category = {
  id: string
  name: string
  color: string
}

type Event = {
  id: number
  title: string
  start: Date
  end: Date
  categoryId: string
}

type ViewType = 'day' | '2day' | '3day' | '4day' | '5day' | '6day' | '7day' | 'month' | 'year'

const defaultCategories: Category[] = [
  { id: 'work', name: 'Work', color: '#4285F4' },
  { id: 'personal', name: 'Personal', color: '#34A853' },
  { id: 'family', name: 'Family', color: '#FBBC05' },
  { id: 'other', name: 'Other', color: '#EA4335' },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    start: new Date(),
    end: new Date(),
    categoryId: 'personal'
  })
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [viewType, setViewType] = useState<ViewType>('month')
  const [dragStart, setDragStart] = useState<Date | null>(null)
  const [dragEnd, setDragEnd] = useState<Date | null>(null)
  const [previewEvent, setPreviewEvent] = useState<Omit<Event, 'id'> | null>(null)
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('')
  const calendarRef = useRef<HTMLDivElement>(null)
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const days = ['1', '2', '3', '4', '5', '6', '7']
      if (days.includes(e.key)) {
        setViewType(e.key === '1' ? 'day' : `${e.key}day` as ViewType)
      } else if (e.key === 'm') {
        setViewType('month')
      } else if (e.key === 'y') {
        setViewType('year')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const addOrUpdateEvent = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...editingEvent, ...newEvent } : e))
    } else if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: Date.now() }])
    }
    setNewEvent({ title: '', start: new Date(), end: new Date(), categoryId: 'personal' })
    setShowEventDialog(false)
    setEditingEvent(null)
  }

  const handleEventClick = (event: Event) => {
    setEditingEvent(event)
    setNewEvent(event)
    setShowEventDialog(true)
  }

  const handleDayClick = (date: Date) => {
    const newEventStart = new Date(date)
    newEventStart.setHours(new Date().getHours())
    const newEventEnd = new Date(newEventStart)
    newEventEnd.setHours(newEventStart.getHours() + 1)
    setNewEvent({ ...newEvent, start: newEventStart, end: newEventEnd })
    setShowEventDialog(true)
  }

  const handleDragStart = (date: Date) => {
    setDragStart(date)
    setDragEnd(date)
    setPreviewEvent({
      title: 'New Event',
      start: date,
      end: new Date(date.getTime() + 60 * 60 * 1000),
      categoryId: newEvent.categoryId
    })
  }

  const handleDragMove = (date: Date) => {
    if (dragStart) {
      setDragEnd(date)
      setPreviewEvent(prev => prev ? {
        ...prev,
        start: new Date(Math.min(dragStart.getTime(), date.getTime())),
        end: new Date(Math.max(dragStart.getTime(), date.getTime()) + 24 * 60 * 60 * 1000)
      } : null)
    }
  }

  const handleDragEnd = () => {
    if (dragStart && dragEnd) {
      const newEventStart = new Date(Math.min(dragStart.getTime(), dragEnd.getTime()))
      const newEventEnd = new Date(Math.max(dragStart.getTime(), dragEnd.getTime()) + 24 * 60 * 60 * 1000)
      setNewEvent({ ...newEvent, start: newEventStart, end: newEventEnd })
      setShowEventDialog(true)
    }
    setDragStart(null)
    setDragEnd(null)
    setPreviewEvent(null)
  }

  const parseNaturalLanguage = () => {
    const words = naturalLanguageInput.toLowerCase().split(' ')
    const newEvent: Omit<Event, 'id'> = {
      title: '',
      start: new Date(),
      end: new Date(),
      categoryId: 'personal'
    }

    let dateSet = false
    let timeSet = false

    words.forEach((word, index) => {
      if (word === 'tomorrow') {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        newEvent.start = tomorrow
        newEvent.end = new Date(tomorrow)
        dateSet = true
      } else if (word === 'at' && !timeSet) {
        const time = words[index + 1]
        const [hours, minutes] = time.split(':')
        newEvent.start.setHours(parseInt(hours), parseInt(minutes) || 0)
        newEvent.end = new Date(newEvent.start)
        newEvent.end.setHours(newEvent.start.getHours() + 1)
        timeSet = true
      } else if (['work', 'personal', 'family', 'other'].includes(word)) {
        newEvent.categoryId = word
      }
    })

    if (!dateSet) {
      newEvent.start.setHours(9, 0)
      newEvent.end = new Date(newEvent.start)
      newEvent.end.setHours(10, 0)
    }

    newEvent.title = words.filter(w => !['tomorrow', 'at', 'work', 'personal', 'family', 'other'].includes(w)).join(' ')

    setNewEvent(newEvent)
    setShowEventDialog(true)
    setNaturalLanguageInput('')
  }

  const renderDayView = (date: Date, daysToShow: number = 1) => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const days = Array.from({ length: daysToShow }, (_, i) => {
      const day = new Date(date)
      day.setDate(day.getDate() + i)
      return day
    })

    return (
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <div></div>
        {days.map(day => (
          <div key={day.toISOString()} className="text-center font-bold">
            {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        ))}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="text-right pr-2">{hour}:00</div>
            {days.map(day => {
              const cellDate = new Date(day.setHours(hour))
              const isCurrentDay = cellDate.toDateString() === new Date().toDateString()
              return (
                <div 
                  key={cellDate.toISOString()}
                  className={`h-12 border-t relative ${isCurrentDay ? 'bg-primary/20' : ''}`}
                  onMouseDown={() => handleDragStart(cellDate)}
                  onMouseMove={() => handleDragMove(cellDate)}
                  onMouseUp={handleDragEnd}
                >
                  {events
                    .filter(event => 
                      event.start <= cellDate && event.end > cellDate
                    )
                    .map(event => (
                      <div 
                        key={event.id}
                        className="absolute top-0 left-0 right-0 text-white p-1 text-xs rounded overflow-hidden"
                        style={{
                          backgroundColor: categories.find(c => c.id === event.categoryId)?.color,
                          height: `${Math.min(48, (event.end.getTime() - cellDate.getTime()) / (60 * 60 * 1000) * 48)}px`,
                        }}
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}
                      </div>
                    ))
                  }
                  {previewEvent && 
                   previewEvent.start <= cellDate && previewEvent.end > cellDate && (
                    <div 
                      className="absolute top-0 left-0 right-0 bg-primary/50 text-white p-1 text-xs rounded overflow-hidden"
                      style={{
                        height: `${Math.min(48, (previewEvent.end.getTime() - cellDate.getTime()) / (60 * 60 * 1000) * 48)}px`,
                      }}
                    >
                      {previewEvent.title}
                    </div>
                  )}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const renderMonthView = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const startDate = new Date(firstDayOfMonth)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    const endDate = new Date(lastDayOfMonth)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const weeks = []
    let currentWeek = []
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      currentWeek.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {weeks.flat().map((day, index) => {
          const isCurrentMonth = day.getMonth() === date.getMonth()
          const isCurrentDay = day.toDateString() === new Date().toDateString()
          return (
            <div 
              key={index}
              className={`h-32 ${isCurrentMonth ? 'bg-muted' : 'bg-muted/50'} ${isCurrentDay ? 'ring-2 ring-primary' : ''} rounded-lg p-1 overflow-y-auto`}
              onMouseDown={() => handleDragStart(day)}
              onMouseMove={() => handleDragMove(day)}
              onMouseUp={handleDragEnd}
            >
              <div className="font-bold mb-1">{day.getDate()}</div>
              {events
                .filter(event => event.start <= day && event.end > day)
                .map(event => (
                  <div 
                    key={event.id}
                    className="text-xs text-white p-1 rounded mb-1 truncate cursor-pointer"
                    style={{ backgroundColor: categories.find(c => c.id === event.categoryId)?.color }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEventClick(event)
                    }}
                  >
                    {event.title}
                  </div>
                ))
              }
              {previewEvent && previewEvent.start <= day && previewEvent.end > day && (
                <div 
                  className="text-xs bg-primary/50 text-white p-1 rounded mb-1 truncate"
                >
                  {previewEvent.title}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderYearView = (year: number) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1))

    return (
      <div className="grid grid-cols-4 gap-4">
        {months.map(month => (
          <div key={month.toISOString()} className="border rounded p-2">
            <h3 className="text-center font-bold mb-2">
              {month.toLocaleString('default', { month: 'long' })}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center font-bold">{day}</div>
              ))}
              {Array.from({ length: new Date(year, month.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                const currentDay = new Date(year, month.getMonth(), day)
                const isCurrentDay = currentDay.toDateString() === new Date().toDateString()
                const hasEvents = events.some(event => 
                  event.start <= currentDay && event.end > currentDay
                )
                return (
                  <div 
                    key={day}
                    className={`text-center ${isCurrentDay ? 'bg-primary text-primary-foreground' : ''} ${hasEvents ? 'bg-secondary text-secondary-foreground' : ''} rounded-full`}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderCalendar = () => {
    switch (viewType) {
      case 'day':
      case '2day':
      case '3day':
      case '4day':
      case '5day':
      case '6day':
      case '7day':
        return renderDayView(currentDate, parseInt(viewType) || 1)
      case 'month':
        return renderMonthView(currentDate)
      case 'year':
        return renderYearView(currentDate.getFullYear())
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4" ref={calendarRef}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentDate(new Date())} variant="outline">Today</Button>
          <Button onClick={() => {
            const newDate = new Date(currentDate)
            newDate.setMonth(newDate.getMonth() - 1)
            setCurrentDate(newDate)
          }} size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => {
            const newDate = new Date(currentDate)
            newDate.setMonth(newDate.getMonth() + 1)
            setCurrentDate(newDate)
          }} size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="2day">2 Days</SelectItem>
              <SelectItem value="3day">3 Days</SelectItem>
              <SelectItem value="4day">4 Days</SelectItem>
              <SelectItem value="5day">5 Days</SelectItem>
              <SelectItem value="6day">6 Days</SelectItem>
              <SelectItem value="7day">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setTheme(theme => theme === 'dark' ? 'light' : 'dark')} size="icon" variant="outline">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Add event (e.g. 'Meeting tomorrow at 3:00 for work')"
          value={naturalLanguageInput}
          onChange={(e) => setNaturalLanguageInput(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button onClick={parseNaturalLanguage}>Add</Button>
      </div>

      {renderCalendar()}

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input
                id="start"
                type="datetime-local"
                value={newEvent.start.toISOString().slice(0, 16)}
                onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input
                id="end"
                type="datetime-local"
                value={newEvent.end.toISOString().slice(0, 16)}
                onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={newEvent.categoryId}
                onValueChange={(value: string) => setNewEvent({ ...newEvent, categoryId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addOrUpdateEvent}>{editingEvent ? 'Update Event' : 'Add Event'}</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}