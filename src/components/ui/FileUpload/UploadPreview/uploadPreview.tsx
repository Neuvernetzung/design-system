import { CrossIcon } from "../../../../theme/icons";
import { formatBytes } from "../../../../utils/internal";
import { IconButton } from "../../Button";
import { ProgressBar } from "../../Progress";
import { Text } from "../../Typography";

export type FileUploadPreviewProps = {
  started: boolean;
  remove: () => void;
  uploaded: number;
  progress: number;
  file: File;
};

export const FileUploadPreview = ({
  file,
  progress,
  uploaded,
  started,
  remove,
}: FileUploadPreviewProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-row justify-between items-center gap-4">
      <Text size="sm" className="truncate">
        {file.name}
      </Text>
      <div className="flex flex-row gap-2 items-center">
        <Text size="sm" className="flex whitespace-nowrap">
          {started
            ? `${formatBytes(uploaded)} / ${formatBytes(
                file.size
              )} - ${progress?.toFixed(2)}%`
            : `${formatBytes(file.size)} - Ausstehend`}
        </Text>
        {!started && (
          <IconButton
            ariaLabel=""
            onClick={() => remove()}
            variant="ghost"
            size="sm"
            icon={CrossIcon}
          />
        )}
      </div>
    </div>
    {started && (
      <ProgressBar
        progress={progress}
        color={uploaded === file.size ? "success" : "primary"}
      />
    )}
  </div>
);
