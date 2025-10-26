import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { lessonsData } from '@/data/lessonsData';

type AgeGroup = 3 | 4 | 5 | 6;
type AccessibilitySettings = {
  fontSize: 'base' | 'lg' | 'xl';
  highContrast: boolean;
  reducedMotion: boolean;
};

const Index = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(3);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'base',
    highContrast: false,
    reducedMotion: false,
  });
  const [showSettings, setShowSettings] = useState(false);

  const containerClass = `
    ${settings.fontSize === 'base' ? 'text-base-accessible' : ''}
    ${settings.fontSize === 'lg' ? 'text-lg-accessible' : ''}
    ${settings.fontSize === 'xl' ? 'text-xl-accessible' : ''}
    ${settings.highContrast ? 'high-contrast' : ''}
    ${settings.reducedMotion ? 'reduced-motion' : ''}
  `;

  const filteredLessons = lessonsData.filter(lesson => lesson.age === selectedAge);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Эмоции': 'Heart',
      'Коммуникация': 'MessageCircle',
      'Моторика': 'Hand',
      'Познание': 'Lightbulb',
      'Творчество': 'Palette',
      'Социализация': 'Users',
    };
    return icons[category] || 'BookOpen';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Эмоции': 'bg-pink-100 text-pink-700 border-pink-200',
      'Коммуникация': 'bg-purple-100 text-purple-700 border-purple-200',
      'Моторика': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Познание': 'bg-green-100 text-green-700 border-green-200',
      'Творчество': 'bg-blue-100 text-blue-700 border-blue-200',
      'Социализация': 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50 ${containerClass}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Занятия с детьми ОВЗ</h1>
                <p className="text-gray-600 mt-1">Годовая программа развития (сентябрь-май)</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowSettings(true)}
              className="gap-2"
            >
              <Icon name="Settings" size={20} />
              Настройки доступности
            </Button>
          </div>

          <Card className="bg-white/80 backdrop-blur shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" size={24} />
                Выберите возрастную группу
              </CardTitle>
              <CardDescription>Программа адаптирована для каждого возраста</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[3, 4, 5, 6].map((age) => (
                  <Button
                    key={age}
                    variant={selectedAge === age ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedAge(age as AgeGroup)}
                    className="h-20 text-xl font-semibold"
                  >
                    {age} года
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={24} />
                Программа занятий для {selectedAge} лет
              </CardTitle>
              <CardDescription>
                {filteredLessons.length} занятий • Сентябрь - Май
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-sm">
                          {lesson.month} • Неделя {lesson.week}
                        </Badge>
                        <Icon name={getCategoryIcon(lesson.category)} size={24} className="text-purple-500" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Badge className={`${getCategoryColor(lesson.category)} border`}>
                          {lesson.category}
                        </Badge>
                        <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Icon name="Clock" size={16} />
                          <span>{lesson.duration} мин</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedLesson && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={getCategoryIcon(selectedLesson.category)} size={32} className="text-purple-500" />
                    <Badge className={`${getCategoryColor(selectedLesson.category)} border`}>
                      {selectedLesson.category}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl">{selectedLesson.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedLesson.month} • Неделя {selectedLesson.week} • {selectedLesson.duration} минут • Возраст: {selectedLesson.age} года
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Target" size={20} />
                      Цель занятия
                    </h3>
                    <p className="text-gray-700 bg-purple-50 p-4 rounded-lg">{selectedLesson.goal}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Package" size={20} />
                      Необходимые материалы
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedLesson.materials.map((material: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 bg-yellow-50 p-3 rounded-lg">
                          <Icon name="CheckCircle2" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="ListOrdered" size={20} />
                      Ход занятия
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {selectedLesson.steps.map((step: any, idx: number) => (
                        <AccordionItem key={idx} value={`step-${idx}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="font-semibold">{step.title}</span>
                              <span className="text-sm text-gray-500 ml-auto">({step.duration} мин)</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-11 space-y-2">
                              <p className="text-gray-700">{step.description}</p>
                              {step.instructions && (
                                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                  {step.instructions.map((instruction: string, i: number) => (
                                    <li key={i}>{instruction}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Brain" size={20} />
                      Особенности для детей ОВЗ
                    </h3>
                    <div className="bg-pink-50 p-4 rounded-lg space-y-2">
                      {selectedLesson.adaptations.map((adaptation: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="Heart" size={18} className="text-pink-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{adaptation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="ClipboardCheck" size={20} />
                      Ожидаемые результаты
                    </h3>
                    <ul className="space-y-2">
                      {selectedLesson.expectedResults.map((result: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                          <Icon name="Star" size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name="Settings" size={24} />
                Настройки доступности
              </DialogTitle>
              <DialogDescription>
                Настройте интерфейс для комфортной работы
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label htmlFor="fontSize" className="text-base font-semibold">
                  Размер текста
                </Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value: any) => setSettings({ ...settings, fontSize: value })}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Обычный</SelectItem>
                    <SelectItem value="lg">Крупный</SelectItem>
                    <SelectItem value="xl">Очень крупный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="highContrast" className="text-base font-semibold">
                    Высокая контрастность
                  </Label>
                  <p className="text-sm text-gray-500">
                    Улучшает видимость элементов
                  </p>
                </div>
                <Switch
                  id="highContrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => setSettings({ ...settings, highContrast: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reducedMotion" className="text-base font-semibold">
                    Упрощённая анимация
                  </Label>
                  <p className="text-sm text-gray-500">
                    Отключает движение элементов
                  </p>
                </div>
                <Switch
                  id="reducedMotion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => setSettings({ ...settings, reducedMotion: checked })}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
