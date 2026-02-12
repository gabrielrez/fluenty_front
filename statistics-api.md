Route::get('/statistics', [StatisticsController::class, 'index']);

class StatisticsController extends Controller
{
    protected StatisticsService $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function index(Request $request)
    {
        $data = $this
            ->statisticsService
            ->calc($request->user());

        return $this->respond(
            new StatisticsResource($data)
        );
    }
}

class StatisticsService
{
    public function calc(User $user): array
    {
        $percentProgress = ($user->lessons()->count() / Lesson::count()) * 100;

        $lessonsCompleted = $user
            ->completedLessons()
            ->count();

        $wordsSaved = $user
            ->savedWords()
            ->count();

        $studyTime = Lesson::query()
            ->byStudyStatus(LessonUserStatus::Completed->value, $user)
            ->pluck('duration')
            ->sum();

        return [
            'percent_progress' => $percentProgress,
            'completed_lessons' => $lessonsCompleted,
            'words_saved' => $wordsSaved,
            'study_time' => $studyTime,
            'sequence' => $user->sequence,
        ];
    }
}


class StatisticsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if (is_array($this->resource)) {
            return [
                'percent_progress' => $this->resource['percent_progress'],
                'completed_lessons' => $this->resource['completed_lessons'],
                'words_saved' => $this->resource['words_saved'],
                'study_time' => $this->resource['study_time'],
                'sequence' => $this->resource['sequence'],
            ];
        }

        return [
            'percent_progress' => $this->percent_progress,
            'completed_lessons' => $this->completed_lessons,
            'words_saved' => $this->words_saved,
            'study_time' => $this->study_time,
            'sequence' => $this->sequence,
        ];
    }
}
