interface ResponseBody {
  status: number;
  timestamp: string;
}

interface MessageResponseBody extends ResponseBody {
  message: string;
}

interface MethodResponseBody extends ResponseBody {
  id: number;
  message: string;
}

interface ErrorResponseBody extends ResponseBody {
  message?: string;
  fieldErrors?: Record<string, string>;
}
