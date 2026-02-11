## ROUTES

Route::put('/me/update', [UserController::class, 'update']);

## CONTROLLER

    public function update(UserUpdateRequest $request)
    {
        $request->user()->update($request->validatedForUpdate());

        return $this->respond(new UserResource($request->user()->fresh()));
    }

## REQUEST

class UserUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'current_password' => ['required_with:password', 'string'],
            'password' => ['sometimes', 'string', Password::min(8), 'confirmed'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->filled('current_password') && ! Hash::check($this->current_password, $this->user()->password)) {
                $validator->errors()->add('current_password', 'The current password is incorrect.');
            }
        });
    }

    public function validatedForUpdate(): array
    {
        $data = $this->validated();

        unset($data['current_password'], $data['password_confirmation']);

        return $data;
    }
}

## RESOURCE

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'sequence' => $this->sequence,
            'created_at' => $this->created_at,
        ];
    }
}