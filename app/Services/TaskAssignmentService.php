<?php
namespace App\Services;

use App\Models\Task;
use App\Models\User;

class TaskAssignmentService
{
    public function assignUsersToTask(Task $task, array $userIds, int $projectId, int|float $quantity, string $unitType, bool $isSync = false)
    {
        //dd('dsf');
        $userCount = count($userIds);

        if ($userCount === 0) {
            if ($isSync) {
                $task->users()->sync([]); // حذف كل المستخدمين الحاليين
            }
            return;
        }

        $isCollaborative = $unitType === 'collaborative';

        $quantityPerUser = $isCollaborative
            ? $quantity
            : $quantity / $userCount;

        $pivotData = [];

        foreach ($userIds as $userId) {
            $pivotData[$userId] = [
                'project_id' => $projectId,
                'quantity' => $quantityPerUser,
            ];
        }

        // استخدم sync أو attach بناءً على الحالة
        if ($isSync) {
            $task->users()->sync($pivotData);
           
        } else {
            
            $task->users()->attach($pivotData);
        }
    }
}
